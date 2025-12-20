
import {
  getSiteConfig,
  getNavigation,
  getCategories,
  getPageSEO
} from "@/lib/getSiteData";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export async function generateMetadata() {
  const seo = await getPageSEO("categories");
  return {
    title: seo?.meta_title || "All Joke Categories | Judy's Jokes for Kids",
    description: seo?.meta_description || "Browse all our joke categories"
  };
}

export default async function CategoriesPage() {
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
            <span style={{ fontSize: "2.8rem" }}>📚</span> Joke Categories
          </h1>
        </div>
      </section>

      <main className="container">
        <h2 className="section-title">Pick a joke category</h2>

        <div className="categories-grid">
          {categories.map(c => (
            <Link
              key={c.category_slug}
              href={`/${c.category_slug}`}
              className="category-card"
            >
              <div style={{ fontSize: "4rem" }}>{c.emoji}</div>
              <h3 style={{ fontSize: "2rem" }}>{c.category_name}</h3>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
