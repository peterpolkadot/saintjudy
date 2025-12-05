
import { getSiteConfig, getNavigation, getCategory, getJokesByCategory, getParentCategories, getPageSEO } from "@/lib/getSiteData";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StyleSwitcher from "@/components/StyleSwitcher";
import RandomJokeGenerator from "@/components/RandomJokeGenerator";
import RelatedCategories from "@/components/RelatedCategories";
import "../../styles.css";

export async function generateMetadata({ params }) {
  const { subcategory } = params;
  const seo = await getPageSEO(subcategory);
  
  return {
    title: seo?.meta_title || `${subcategory} | Judy's Jokes`,
    description: seo?.meta_description || "Funny jokes for kids",
    keywords: seo?.keywords?.split(",") || [],
  };
}

export default async function SubcategoryPage({ params }) {
  const { category, subcategory } = params;
  
  const config = await getSiteConfig();
  const navigation = await getNavigation();
  const categoryData = await getCategory(subcategory);
  const jokes = await getJokesByCategory(subcategory);
  const allCategories = await getParentCategories();
  
  // Get 3 random categories
  const randomCategories = allCategories
    .sort(() => Math.random() - 0.5);

  if (!categoryData) {
    return (
      <>
        <Navigation config={config} links={navigation} />
        <StyleSwitcher />
        <main>
          <section className="hero hero-small">
            <div className="hero-content">
              <h1 className="hero-title">Category Not Found</h1>
              <p className="hero-subtitle">Sorry, we couldn't find that category!</p>
            </div>
          </section>
        </main>
        <Footer config={config} />
      </>
    );
  }

  const heroStyle = categoryData.image_url 
    ? { backgroundImage: `url(${categoryData.image_url})` }
    : {};

  const heroClass = categoryData.image_url 
    ? "hero hero-small hero-with-bg"
    : "hero hero-small";

  return (
    <>
      <Navigation config={config} links={navigation} />
      <StyleSwitcher />
      
      <main>
        <section className={heroClass} style={heroStyle}>
          <div className="hero-content">
            <h1 className="hero-title">{categoryData.emoji} {categoryData.category_name}</h1>
          </div>
        </section>

        <section className="jokes-section">
          <div className="container">
            <RandomJokeGenerator jokes={jokes} categoryName={categoryData.category_name} />
            <RelatedCategories categories={randomCategories} />
          </div>
        </section>
      </main>

      <Footer config={config} />
    </>
  );
}
