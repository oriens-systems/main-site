import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "interest.json");

/**
 * Serverless hosts use a read-only FS for the project (except /tmp).
 * - Vercel sets VERCEL.
 * - Netlify injects SITE_ID (and URL) into deployed functions; `netlify dev` sets NETLIFY_DEV=true — keep file writes for local dev.
 */
function canWriteInterestFile() {
  if (process.env.VERCEL) return false;
  const isNetlifyRemote =
    process.env.NETLIFY_DEV !== "true" &&
    typeof process.env.SITE_ID === "string" &&
    process.env.SITE_ID.length > 0;
  if (isNetlifyRemote) return false;
  return true;
}

function typeLabels() {
  return {
    student: "Student Design Team",
    professor: "Professor / Researcher",
    shop: "Machine Shop",
  };
}

function buildEmailHtml(data) {
  const labels = typeLabels();
  return `
        <h2>New Interest Registration</h2>
        <p><strong>Type:</strong> ${labels[data.type] || data.type}</p>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Institution:</strong> ${data.institution}</p>
        ${data.problem ? `<p><strong>Problem/Need:</strong><br>${data.problem}</p>` : ""}
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
      `;
}

async function sendWithResend(data) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, reason: "missing_resend_api_key" };

  const from = process.env.RESEND_FROM;
  if (!from) {
    console.error("RESEND_API_KEY set but RESEND_FROM is missing (use a verified sender, e.g. Oriens <hello@yourdomain.com>)");
    return { ok: false, reason: "missing_resend_from" };
  }

  const labels = typeLabels();
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [process.env.INTEREST_NOTIFY_EMAIL || "hello@oriens.systems"],
      subject: `New Interest Registration: ${labels[data.type] || data.type}`,
      html: buildEmailHtml(data),
      reply_to: data.email,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    console.error("Resend error:", res.status, errText);
    return { ok: false, reason: `resend_http_${res.status}` };
  }
  return { ok: true };
}

async function sendWithSmtp(data) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return { ok: false, reason: "missing_smtp_config" };

  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    host,
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: process.env.SMTP_PORT === "465",
    auth: { user, pass },
  });

  const labels = typeLabels();
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.INTEREST_NOTIFY_EMAIL || "hello@oriens.systems",
    subject: `New Interest Registration: ${labels[data.type] || data.type}`,
    html: buildEmailHtml(data),
    replyTo: data.email,
  });
  return { ok: true };
}

async function appendToLocalFile(submission) {
  const dataDir = path.dirname(DATA_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }

  let submissions = [];
  try {
    const fileContent = await fs.readFile(DATA_FILE, "utf8");
    submissions = JSON.parse(fileContent);
  } catch {
    submissions = [];
  }
  submissions.push(submission);
  await fs.writeFile(DATA_FILE, JSON.stringify(submissions, null, 2));
}

export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.firstName || !data.lastName || !data.email || !data.institution || !data.type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const submission = {
      ...data,
      timestamp: new Date().toISOString(),
    };

    let savedToFile = false;
    if (canWriteInterestFile()) {
      try {
        await appendToLocalFile(submission);
        savedToFile = true;
      } catch (err) {
        console.error("Failed to write interest.json:", err);
      }
    }

    let emailed = false;
    let emailFailureReason = "email_not_attempted";
    try {
      const resendResult = await sendWithResend(data);
      if (resendResult.ok) {
        emailed = true;
      } else {
        const smtpResult = await sendWithSmtp(data);
        emailed = smtpResult.ok;
        emailFailureReason = smtpResult.ok
          ? resendResult.reason
          : `${resendResult.reason}|${smtpResult.reason}`;
      }
    } catch (err) {
      console.error("Failed to send interest notification email:", err);
      emailFailureReason = "email_exception";
    }

    if (!savedToFile && !emailed) {
      return NextResponse.json(
        {
          error: "Submission failed server-side. Check form handler config in Netlify environment variables.",
          detail: emailFailureReason,
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Interest registered successfully",
    });
  } catch (error) {
    console.error("Error processing interest registration:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
