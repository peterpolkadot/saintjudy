
import {
  getSiteConfig,
  getNavigation,
  getCategory,
  getJokesByCategory,
  getCategories,
  getJokeVotes,
  getPageSEO
} from "@/lib/getSiteData";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import JokesList from "@/components/JokesList";
import RelatedCategories from "@/components/RelatedCategories";

export async function generateMetadata({ params }) {
  const seo = await getPageSEO(params.category);
  return {
    title: seo?.meta_title || "Jokes",
    description: seo?.meta_description || "Funny jokes for kids"
  };
}

export default async function CategoryPage({ params }) {
  const categorySlug = params.category;

  const config = await getSiteConfig();
  const navigation = await getNavigation();
  const category = await getCategory(categorySlug);
  const jokes = await getJokesByCategory(categorySlug);
  const allCategories = await getCategories();

  if (!category) return null;

  const jokeIds = jokes.map(j => j.id);
  const votes = await getJokeVotes(jokeIds);

  const filtered = allCategories.filter(c => c.category_slug !== categorySlug);
  const shuffled = filtered.sort(() => Math.random() - 0.5);
  const related = shuffled.slice(0, 3);

  return (
    <>
      <Navigation config={config} links={navigation} />

      <section className="hero">
        <div className="hero-content container">
          <h1 className="hero-title">
            {category.emoji} {category.category_name} Jokes for Kids
          </h1>
        </div>
      </section>

      <main className="container">
        <JokesList jokes={jokes} initialVotes={votes} />
        <RelatedCategories categories={related} />
      </main>

      <Footer />
    </>
  );
}
