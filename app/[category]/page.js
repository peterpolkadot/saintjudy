
import { 
  getSiteConfig, 
  getNavigation, 
  getCategory, 
  getSubcategories, 
  getAllJokesForParent, 
  getParentCategories, 
  getPageSEO 
} from "@/lib/getSiteData";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import RandomJokeGenerator from "@/components/RandomJokeGenerator";
import SubcategoryCards from "@/components/SubcategoryCards";
import RelatedCategories from "@/components/RelatedCategories";
import NoSubcategories from "@/components/NoSubcategories";
import NoJokesYet from "@/components/NoJokesYet";
import JokesList from "@/components/JokesList";


export async function generateMetadata({ params }) {
  const { category } = params;
  const seo = await getPageSEO(category);
  const categoryData = await getCategory(category);

  return {
    title: seo?.meta_title || `${categoryData?.category_name || category} Jokes | Judy's Jokes`,
    description: seo?.meta_description || `Funny ${categoryData?.category_name || category} jokes for kids`,
    keywords: seo?.keywords?.split(",") || [`${category} jokes`, "kids jokes", "funny jokes"],
  };
}

export default async function CategoryPage({ params }) {
  const { category } = params;

  const config = await getSiteConfig();
  const navigation = await getNavigation();
  const categoryData = await getCategory(category);
  const subcategories = await getSubcategories(category);
  const jokes = await getAllJokesForParent(category);
  const allParents = await getParentCategories();

  const related = allParents
    .filter(cat => cat.category_slug !== category)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  if (!categoryData) {
    return (
      <>
        <Navigation config={config} links={navigation} />
        <main>
          <section className="hero hero-small">
            <div className="hero-content">
              <h1 className="hero-title">Category Not Found</h1>
              <p className="hero-subtitle">Oops! That category doesn't exist.</p>
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

  // Structured Data
  const breadcrumbData = {
    items: [
      { name: "Home", url: "https://saintjudy.vercel.app" },
      { name: categoryData.category_name, url: `https://saintjudy.vercel.app/${category}` }
    ]
  };

  const collectionData = {
    name: `${categoryData.category_name} Jokes`,
    description: `Funny ${categoryData.category_name} jokes for kids`,
    url: `https://saintjudy.vercel.app/${category}`,
    numberOfJokes: jokes.length,
    jokes: jokes.slice(0, 20) // First 20 for structured data
  };

  return (
    <>
      <StructuredData type="breadcrumb" data={breadcrumbData} />
      <StructuredData type="collectionPage" data={collectionData} />
      
      <Navigation config={config} links={navigation} />

      <main>
        <section className={heroClass} style={heroStyle}>
          <div className="hero-content">
            <h1 className="hero-title">{categoryData.emoji} {categoryData.category_name}</h1>
          </div>
        </section>

        <section className="jokes-section">
          <div className="container">

            {/* RANDOM JOKE GENERATOR */}
            {jokes.length > 0 ? (
              <RandomJokeGenerator jokes={jokes} categoryName={categoryData.category_name} />
            ) : (
              <NoJokesYet name={categoryData.category_name} />
            )}

            {/* FULL JOKE LIST */}
            {jokes.length > 0 && <JokesList jokes={jokes} />}

            {/* SUBCATEGORY CARDS */}
            {subcategories.length > 0 ? (
              <SubcategoryCards subcategories={subcategories} parentSlug={category} />
            ) : (
              <NoSubcategories name={categoryData.category_name} />
            )}

            <RelatedCategories categories={related} />
          </div>
        </section>
      </main>

      <Footer config={config} />
    </>
  );
}
