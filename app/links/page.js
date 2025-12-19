
import {
  getSiteConfig,
  getNavigation,
  getPageSEO
} from "@/lib/getSiteData";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export async function generateMetadata() {
  const seo = await getPageSEO("links");
  return {
    title: seo?.meta_title || "Fun Links for Kids | Judy's Jokes",
    description: seo?.meta_description || "Check out these awesome websites for kids"
  };
}

export default async function LinksPage() {
  const config = await getSiteConfig();
  const navigation = await getNavigation();

  const kidsSites = [
    {
      name: "National Geographic Kids",
      url: "https://kids.nationalgeographic.com/",
      emoji: "🌍",
      description: "Amazing facts about animals, science, and nature"
    },
    {
      name: "Funbrain",
      url: "https://www.funbrain.com/",
      emoji: "🎮",
      description: "Educational games, books, and videos"
    },
    {
      name: "NASA Kids' Club",
      url: "https://www.nasa.gov/kidsclub/",
      emoji: "🚀",
      description: "Space games and activities from NASA"
    },
    {
      name: "Highlights Kids",
      url: "https://www.highlightskids.com/",
      emoji: "✨",
      description: "Games, puzzles, and fun activities"
    }
  ];

  return (
    <>
      <Navigation config={config} links={navigation} />

      <section className="hero">
        <div className="hero-content container">
          <h1 className="hero-title">🔗 Fun Links for Kids 🔗</h1>
        </div>
      </section>

      <main className="container">
        <div className="section-card">
          <h2>Check out these awesome websites!</h2>
        </div>

        <div className="categories-grid">
          {kidsSites.map((site, i) => (
            <a key={i} href={site.url} target="_blank" rel="noopener noreferrer" className="category-card">
              <div>{site.emoji}</div>
              <h3>{site.name}</h3>
              <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>
                {site.description}
              </p>
            </a>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
