
import {
  getSiteConfig,
  getNavigation,
  getCategories,
  getPageSEO
} from "@/lib/getSiteData";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MemoryMatchGame from "@/components/MemoryMatchGame";

export async function generateMetadata() {
  const seo = await getPageSEO("games");
  return {
    title: seo?.meta_title || "Fun Games | Judy's Jokes for Kids",
    description: seo?.meta_description || "Play fun memory games with joke emojis"
  };
}

export default async function GamesPage() {
  const config = await getSiteConfig();
  const navigation = await getNavigation();
  const categories = await getCategories();

  return (
    <>
      <Navigation config={config} links={navigation} />

      <section className="hero">
        <div className="hero-content container">
          <h1 className="hero-title" style={{ 
            background: "#ff5fa2",
            fontSize: "3.5rem",
            textShadow: "3px 3px 0 #ffe600, 3px 3px 0 #000"
          }}>
            <span style={{ fontSize: "2.8rem" }}>🎮</span> Fun Games
          </h1>
        </div>
      </section>

      <main className="container">
        <MemoryMatchGame categories={categories} />
      </main>

      <Footer />
    </>
  );
}
