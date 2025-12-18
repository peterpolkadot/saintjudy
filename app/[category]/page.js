
import {
  getSiteConfig,
  getNavigation,
  getCategory,
  getJokesByCategory,
  getCategories,
  getPageSEO
} from "@/lib/getSiteData";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RandomJokeGenerator from "@/components/RandomJokeGenerator";
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

  const related = allCategories.filter(c => c.category_slug !== categorySlug).slice(0, 3);

  return (
    <>
      <Navigation config={config} links={navigation} />
      <main className="container">
        <h1>{category.emoji} {category.category_name}</h1>
        {jokes.length > 0 && <RandomJokeGenerator jokes={jokes} />}
        <JokesList jokes={jokes} />
        <RelatedCategories categories={related} />
      </main>
      <Footer config={config} />
    </>
  );
}
