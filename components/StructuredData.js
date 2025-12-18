
export default function StructuredData({ type, data }) {
  let schema = {};

  if (type === "website") {
    schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": data.name,
      "url": data.url,
      "description": data.description,
      "publisher": {
        "@type": "Organization",
        "name": data.name
      }
    };
  }

  if (type === "joke") {
    schema = {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "text": data.setup + " " + data.punchline,
      "genre": "Joke",
      "audience": {
        "@type": "PeopleAudience",
        "suggestedMinAge": 5,
        "suggestedMaxAge": 12
      },
      "inLanguage": "en-US",
      "about": {
        "@type": "Thing",
        "name": data.category
      }
    };
  }

  if (type === "breadcrumb") {
    schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": data.items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    };
  }

  if (type === "collectionPage") {
    schema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": data.name,
      "description": data.description,
      "url": data.url,
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": data.numberOfJokes,
        "itemListElement": data.jokes?.map((joke, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "CreativeWork",
            "text": joke.setup + " " + joke.punchline,
            "genre": "Joke"
          }
        })) || []
      }
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
