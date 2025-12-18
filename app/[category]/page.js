
import {
  getSiteConfig,
  getNavigation,
  getCategory,
  getJokesByCategory,
  getCategories
} from "@/lib/getSiteData";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RandomJokeGenerator from "@/components/RandomJokeGenerator";
import JokesList from "@/components/JokesList";
import RelatedCategories from "@/components/RelatedCategories";

export default async function CategoryPage({ params }) {
  const slug = params.category;

  const config = await getSiteConfig();
  const nav = await getNavigation();
  const category = await getCategory(slug);
  const jokes = await getJokesByCategory(slug);
  const all = await getCategories();

  const related = all.filter(c => c.category_slug !== slug).slice(0, 3);

  return (
    <>
      <Navigation config={config} links={nav} />
      <main className="container">
        <h1>{category.emoji} {category.category_name}</h1>
        {jokes.length > 0 && <RandomJokeGenerator jokes={jokes} />}
        <JokesList jokes={jokes} />
        <RelatedCategories categories={related} />
      </main>
      <Footer />
    </>
  );
}
