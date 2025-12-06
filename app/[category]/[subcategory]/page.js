
import {
  getSiteConfig,
  getNavigation,
  getCategory,
  getSubcategories,
  getJokesForSubcategory,
  getParentCategories,
  readableSlug,
  getPageSEO
} from "@/lib/getSiteData";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StyleSwitcher from "@/components/StyleSwitcher";
import RandomJokeGenerator from "@/components/RandomJokeGenerator";
import RelatedCategories from "@/components/RelatedCategories";

import "../../styles.css";

/* -------------------------------------------------------------
   SEO
------------------------------------------------------------- */
export async function generateMetadata({ params }) {
  const { subcategory } = params;
  const readable = readableSlug(subcategory);

  const seo = await getPageSEO(subcategory);

  return {
    title: seo?.meta_title || `${readable} | Judy's Jokes`,
    description: seo?.meta_description || `Jokes for ${readable}`,
    keywords: seo?.keywords?.split(",") || []
  };
}

/* -------------------------------------------------------------
   RENDER SUBCATEGORY PAGE
------------------------------------------------------------- */
export default async function SubcategoryPage({ params }) {
  const { category, subcategory } = params;

  const config = await getSiteConfig();
  const navigation = await getNavigation();

  // Get the CATEGORY record that matches this subcategory_slug
  const categoryData = await getCategory(subcategory);

  // Get the ACTUAL jokes for this subcategory
  const jokes = await getJokesForSubcategory(subcategory);

  // For sidebar/related section
  const parentCats = await getParentCategories();
  const randomCategories = parentCats.sort(() => Math.random() - 0.5).slice(0, 3);

  // If no category row exists, show 404
  if (!categoryData) {
    return (
      <>
        <Navigation config={config} links={navigation} />
        <StyleSwitcher />
        <main>
          <section className="hero hero-small">
            <div className="hero-content">
              <h1 className="hero-title">Subcategory Not Found</h1>
              <p className="hero-subtitle">Sorry, that page doesn't exist.</p>
            </div>
          </section>
        </main>
        <Footer config={config} />
      </>
    );
  }

  const heroStyle = categoryData.image_url ? { backgroundImage: `url(${categoryData.image_url})` } : {};
  const heroClass = categoryData.image_url ? "hero hero-small hero-with-bg" : "hero hero-small";

  return (
    <>
      <Navigation config={config} links={navigation} />
      <StyleSwitcher />

      <main>
        <section className={heroClass} style={heroStyle}>
          <div className="hero-content">
            <h1 className="hero-title">
              {categoryData.emoji} {categoryData.category_name}
            </h1>
          </div>
        </section>

        <section className="jokes-section">
          <div className="container">
            <RandomJokeGenerator
              jokes={jokes}
              categoryName={categoryData.category_name}
            />
            <RelatedCategories categories={randomCategories} />
          </div>
        </section>
      </main>

      <Footer config={config} />
    </>
  );
}
