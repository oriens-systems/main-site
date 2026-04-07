import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import nodemailer from "nodemailer";

const DATA_FILE = path.join(process.cwd(), "data", "interest.json");

// Email configuration
// Configure these environment variables in your .env.local file:
// SMTP_HOST=smtp.gmail.com (or your SMTP host)
// SMTP_PORT=587
// SMTP_USER=your-email@gmail.com
// SMTP_PASS=your-app-password
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.institution || !data.type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create submission object with timestamp
    const submission = {
      ...data,
      timestamp: new Date().toISOString(),
    };

    // Ensure data directory exists
    const dataDir = path.dirname(DATA_FILE);
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }

    // Read existing data or create new array
    let submissions = [];
    try {
      const fileContent = await fs.readFile(DATA_FILE, "utf8");
      submissions = JSON.parse(fileContent);
    } catch (error) {
      // File doesn't exist yet, start with empty array
      submissions = [];
    }

    // Append new submission
    submissions.push(submission);

    // Write back to file
    await fs.writeFile(DATA_FILE, JSON.stringify(submissions, null, 2));

    // Send email notification
    try {
      const typeLabels = {
        student: "Student Design Team",
        professor: "Professor / Researcher",
        shop: "Machine Shop",
      };

      const emailHtml = `
        <h2>New Interest Registration</h2>
        <p><strong>Type:</strong> ${typeLabels[data.type] || data.type}</p>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Institution:</strong> ${data.institution}</p>
        ${data.problem ? `<p><strong>Problem/Need:</strong><br>${data.problem}</p>` : ""}
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
      `;

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: "hello@oriens.systems",
        subject: `New Interest Registration: ${typeLabels[data.type] || data.type}`,
        html: emailHtml,
        replyTo: data.email,
      });
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError);
      // Don't fail the request if email fails, data is already saved
    }

    return NextResponse.json({
      success: true,
      message: "Interest registered successfully",
    });
  } catch (error) {
    console.error("Error processing interest registration:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
