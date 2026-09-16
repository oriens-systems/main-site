export async function GET() {
  const robotsTxt = `# robots.txt - Oriens Systems

User-agent: *
Allow: /

Sitemap: https://orienssystems.com/sitemap.xml
`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
