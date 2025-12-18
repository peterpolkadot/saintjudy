
import { getSiteConfig, getNavigation, getParentCategories, getPageSEO } from "@/lib/getSiteData";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export async function generateMetadata() {
  const seo = await getPageSEO("home");
  
  return {
    title: seo?.meta_title || "Judy's Jokes",
    description: seo?.meta_description || "Hilarious jokes for kids",
    keywords: seo?.keywords?.split(",") || [],
  };
}

export default async function HomePage() {
  const config = await getSiteConfig();
  const navigation = await getNavigation();
  const categories = await getParentCategories();

  return (
    <>
      <Navigation config={config} links={navigation} />
      
      <main>
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">🎭 Welcome to Judy's Jokes! 🎭</h1>
            <p className="hero-subtitle">The funniest, cleanest jokes for kids!</p>
            <p className="hero-text">Pick a category below and get ready to giggle!</p>
          </div>
        </section>

        <section className="categories-section">
          <div className="container">
            <h2 className="section-title">Joke Categories</h2>
            <p className="section-subtitle">Choose your favorite type of joke!</p>
            
            <div className="categories-grid">
              {categories.map((cat) => (
                <Link key={cat.category_slug} href={`/${cat.category_slug}`} className="category-card">
                  {cat.image_url && (
                    <div className="category-image">
                      <img src={cat.image_url} alt={cat.category_name} />
                    </div>
                  )}
                  {!cat.image_url && <div className="category-emoji">{cat.emoji}</div>}
                  <h3>{cat.category_name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer config={config} />
    </>
  );
}
