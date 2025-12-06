
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
import NoJokesYet from "@/components/NoJokesYet";
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

  // Parent category details (emoji + display name)
  const parent = await getCategory(parentSlug);

  // Subcategory list for navigation
  const subcategories = await getSubcategories(parentSlug);

  // Jokes for this specific subcategory
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

            {jokes.length > 0 ? (
              <RandomJokeGenerator 
                jokes={jokes} 
                categoryName={currentSub?.subcategory_name || readableSlug(subSlug)} 
              />
            ) : (
              <NoJokesYet name={currentSub?.subcategory_name || readableSlug(subSlug)} />
            )}

            {/* Subcategory selector list */}
            <div className="subcategory-list">
              {subcategories.map((s) => (
                <a
                  key={s.subcategory_slug}
                  href={`/${parentSlug}/${s.subcategory_slug}`}
                  className={s.subcategory_slug === subSlug ? "active" : ""}
                >
                  {s.emoji} {s.subcategory_name}
                </a>
              ))}
            </div>

          </div>
        </section>
      </main>

      <Footer config={config} />
    </>
  );
}
