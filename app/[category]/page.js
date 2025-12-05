
import { getSiteConfig, getNavigation, getCategory, getSubcategories, getAllJokesForParent, getParentCategories, getPageSEO } from "@/lib/getSiteData";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StyleSwitcher from "@/components/StyleSwitcher";
import RandomJokeGenerator from "@/components/RandomJokeGenerator";
import SubcategoryCards from "@/components/SubcategoryCards";
import RelatedCategories from "@/components/RelatedCategories";
import "../styles.css";

export async function generateMetadata({ params }) {
  const { category } = params;
  const seo = await getPageSEO(category);
  
  return {
    title: seo?.meta_title || `${category} | Judy's Jokes`,
    description: seo?.meta_description || "Funny jokes for kids",
    keywords: seo?.keywords?.split(",") || [],
  };
}

export default async function CategoryPage({ params }) {
  const { category } = params;
  
  const config = await getSiteConfig();
  const navigation = await getNavigation();
  const categoryData = await getCategory(category);
  const subcategories = await getSubcategories(category);
  const jokes = await getAllJokesForParent(category);
  const allCategories = await getParentCategories();
  
  // Get 3 random categories (excluding current one)
  const otherCategories = allCategories
    .filter(cat => cat.category_slug !== category)
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
            {jokes.length > 0 && <RandomJokeGenerator jokes={jokes} categoryName={categoryData.category_name} />}
            {subcategories.length > 0 && <SubcategoryCards subcategories={subcategories} parentSlug={category} />}
            <RelatedCategories categories={otherCategories} />
          </div>
        </section>
      </main>

      <Footer config={config} />
    </>
  );
}
