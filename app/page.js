
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
          <h1 className="hero-title" style={{ 
            background: "#ff5fa2",
            fontSize: "3.5rem",
            textShadow: "3px 3px 0 #ffe600, 3px 3px 0 #000"
          }}>
            <span style={{ fontSize: "2.8rem" }}>😂</span> Judy's Jokes for Kids
          </h1>
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
      </main>

      <Footer />
    </>
  );
}
