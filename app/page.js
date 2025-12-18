
import { getSiteConfig, getNavigation, getCategories, getPageSEO } from "@/lib/getSiteData";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export async function generateMetadata() {
  const seo = await getPageSEO("home");
  return {
    title: seo?.meta_title || "Judy's Jokes",
    description: seo?.meta_description || "Clean jokes for kids"
  };
}

export default async function HomePage() {
  const config = await getSiteConfig();
  const navigation = await getNavigation();
  const categories = await getCategories();

  return (
    <>
      <Navigation config={config} links={navigation} />
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
      <Footer config={config} />
    </>
  );
}
