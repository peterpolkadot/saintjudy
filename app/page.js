
import { getSiteConfig, getNavigation, getCategories } from "@/lib/getSiteData";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export default async function HomePage() {
  const config = await getSiteConfig();
  const nav = await getNavigation();
  const categories = await getCategories();

  return (
    <>
      <Navigation config={config} links={nav} />
      <main className="container">
        <h1>😂 Judy's Jokes for Kids 😂</h1>
        <div className="categories-grid">
          {categories.map(cat => (
            <Link key={cat.category_slug} href={`/${cat.category_slug}`} className="category-card">
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
