const BASE_URL = "https://orienssystems.com";

/**
 * Renders BreadcrumbList JSON-LD for SEO. Use on inner pages (about, applications, contact, pilot, join).
 * @param {{ name: string; path: string }[]} items - Breadcrumb items. First should be Home, last is current page.
 */
export default function BreadcrumbJsonLd({ items }) {
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
    />
  );
}
