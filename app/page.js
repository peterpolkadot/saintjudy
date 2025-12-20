
import {
  getSiteConfig,
  getNavigation,
  getCategories,
  getAllJokes,
  getTopJokes,
  getPageSEO
} from "@/lib/getSiteData";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RandomJokeGenerator from "@/components/RandomJokeGenerator";
import TopJokesLeaderboard from "@/components/TopJokesLeaderboard";
import Link from "next/link";

export async function generateMetadata() {
  const seo = await getPageSEO("home");
  return {
    title: seo?.meta_title || "Judy's Jokes for Kids",
    description: seo?.meta_description || "Clean, funny jokes for kids"
  };
}

export default async function HomePage() {
  const config = await getSiteConfig();
  const navigation = await getNavigation();
  const categories = await getCategories();
  const allJokes = await getAllJokes();
  const { jokes: topJokes, votes: topVotes } = await getTopJokes(10);

  const totalJokes = allJokes.length;
  const lastUpdated = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <>
      <Navigation config={config} links={navigation} />

      <section className="hero">
        <div className="hero-content container">
          <h1 className="hero-title" style={{ background: "#ff5fa2" }}>😂 Judy's Jokes for Kids 😂</h1>
          <p style={{ 
            fontSize: "1.3rem", 
            fontWeight: "600", 
            marginTop: "1.5rem",
            color: "#fff",
            textShadow: "2px 2px 0 #000"
          }}>
            {totalJokes} kid-friendly jokes • Last updated by Judy {lastUpdated}
          </p>
        </div>
      </section>

      <main className="container">
        <TopJokesLeaderboard initialJokes={topJokes} initialVotes={topVotes} />
        
        <RandomJokeGenerator jokes={allJokes} category="random" />

        <h2 className="section-title" style={{ marginTop: "4rem" }}>Pick a joke category</h2>

        <div className="categories-grid">
          {categories.map(c => (
            <Link
              key={c.category_slug}
              href={`/${c.category_slug}`}
              className="category-card"
            >
              <div>{c.emoji}</div>
              <h3>{c.category_name}</h3>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
