
import { getSiteConfig, getNavigation, getParentCategories, getPageSEO } from "@/lib/getSiteData";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import Link from "next/link";


export async function generateMetadata() {
  const seo = await getPageSEO("categories");
  
  return {
    title: seo?.meta_title || "All Joke Categories | Judy's Jokes",
    description: seo?.meta_description || "Browse all joke categories for kids",
    keywords: seo?.keywords?.split(",") || ["joke categories", "kids jokes", "funny jokes"],
  };
}

export default async function CategoriesPage() {
  const config = await getSiteConfig();
  const navigation = await getNavigation();
  const categories = await getParentCategories();

  const breadcrumbData = {
    items: [
      { name: "Home", url: "https://saintjudy.vercel.app" },
      { name: "Categories", url: "https://saintjudy.vercel.app/categories" }
    ]
  };

  return (
    <>
      <StructuredData type="breadcrumb" data={breadcrumbData} />
      
      <Navigation config={config} links={navigation} />
      
      <main>
        <section className="hero hero-small">
          <div className="hero-content">
            <h1 className="hero-title">All Joke Categories</h1>
            <p className="hero-subtitle">Pick your favorite and start laughing!</p>
          </div>
        </section>

        <section className="categories-section">
          <div className="container">
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
