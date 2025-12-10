
import { 
  getCategory, 
  getSubcategories, 
  getJokesForSubcategory, 
  readableSlug, 
  getSiteConfig,
  getNavigation,
  getPageSEO 
} from "@/lib/getSiteData";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StyleSwitcher from "@/components/StyleSwitcher";
import RandomJokeGenerator from "@/components/RandomJokeGenerator";
import JokesList from "@/components/JokesList";
import NoJokesYet from "@/components/NoJokesYet";
import Link from "next/link";
import "../../styles.css";

export async function generateMetadata({ params }) {
  const { category, subcategory } = params;
  const seoKey = `${category}/${subcategory}`;
  const seo = await getPageSEO(seoKey);

  return {
    title: seo?.meta_title || `${readableSlug(subcategory)} Jokes`,
    description: seo?.meta_description || "Funny jokes from this category",
    keywords: seo?.keywords?.split(",") || [],
  };
}

export default async function SubcategoryPage({ params }) {
  const parentSlug = params.category;
  const subSlug = params.subcategory;

  const config = await getSiteConfig();
  const navigation = await getNavigation();

  const parent = await getCategory(parentSlug);
  const subcategories = await getSubcategories(parentSlug);
  const jokes = await getJokesForSubcategory(subSlug);

  const currentSub = subcategories.find(s => s.subcategory_slug === subSlug);

  return (
    <>
      <Navigation config={config} links={navigation} />
      <StyleSwitcher />

      <main>
        <section className="hero hero-small">
          <div className="hero-content">
            <h1 className="hero-title">
              {parent?.emoji} {currentSub?.subcategory_name || readableSlug(subSlug)}
            </h1>
          </div>
        </section>

        <section className="jokes-section">
          <div className="container">

            {/* RANDOM JOKE GENERATOR */}
            {jokes.length > 0 ? (
              <RandomJokeGenerator 
                jokes={jokes} 
                categoryName={currentSub?.subcategory_name || readableSlug(subSlug)} 
              />
            ) : (
              <NoJokesYet name={currentSub?.subcategory_name || readableSlug(subSlug)} />
            )}

            {/* ⭐ FULL JOKE LIST (Option A — directly under generator) */}
            {jokes.length > 0 && <JokesList jokes={jokes} />}

            {/* SUBCATEGORY CARDS */}
            <div className="subcategories-section mt-14">
              <h2 className="section-title">More {readableSlug(parentSlug)} Categories</h2>

              <div className="categories-grid">
                {subcategories.map((sub) => (
                  <Link
                    key={sub.subcategory_slug}
                    href={`/${parentSlug}/${sub.subcategory_slug}`}
                    className="category-card"
                  >
                    {sub.emoji && (
                      <div className="category-emoji">{sub.emoji}</div>
                    )}
                    <h3>{sub.subcategory_name}</h3>
                  </Link>
                ))}
              </div>
            </div>

            {/* HOME BUTTON */}
            <div className="home-button-container">
              <Link href="/" className="home-button">🏠 Back to Home</Link>
            </div>

          </div>
        </section>
      </main>

      <Footer config={config} />
    </>
  );
}
