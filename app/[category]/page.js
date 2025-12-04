
import { getSiteConfig, getNavigation, getCategory, getJokesByCategory, getPageSEO } from "@/lib/getSiteData";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StyleSwitcher from "@/components/StyleSwitcher";
import RandomJokeGenerator from "@/components/RandomJokeGenerator";
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
  const jokes = await getJokesByCategory(category);

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
    <h1 className="hero-title">{getCategoryEmoji(category)} {categoryData.category_name}</h1>
  </div>
</section>

        <section className="jokes-section">
          <div className="container">
            <RandomJokeGenerator jokes={jokes} />
          </div>
        </section>
      </main>

      <Footer config={config} />
    </>
  );
}

function getCategoryEmoji(slug) {
  const emojis = {
    "animal-jokes": "🐶",
    "school-jokes": "📚",
    "food-jokes": "🍕",
    "dad-jokes": "👨",
    "silly-jokes": "🤪"
  };
  return emojis[slug] || "😂";
}
