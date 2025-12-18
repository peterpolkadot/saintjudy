
import { getSiteConfig, getNavigation, getCategories, getPageSEO } from "@/lib/getSiteData";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export async function generateMetadata() {
  const seo = await getPageSEO("home");
  return {
    title: seo?.meta_title || "Judy's Jokes for Kids",
    description: seo?.meta_description || "Clean, funny jokes for kids"
  };
}

export default async function HomePage() {
  const config = await getSiteConfig();
  const navigation = await getNavigation();
  const categories = await getCategories();

  return (
    <>
      <Navigation config={config} links={navigation} />

      {/* HERO */}
      <section className="hero">
        <div className="hero-content container">
          <h1 className="hero-title">
            😂 Judy's Jokes for Kids 😂
          </h1>
        </div>
      </section>

      {/* CATEGORIES */}
      <main className="container">
        <h2 className="section-title">
          Pick a joke category
        </h2>

        <div className="categories-grid">
          {categories.map(cat => (
            <Link
              key={cat.category_slug}
              href={`/${cat.category_slug}`}
              className="category-card"
            >
              <div>{cat.emoji}</div>
              <h3>{cat.category_name}</h3>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
