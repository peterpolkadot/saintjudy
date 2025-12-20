
import { supabase } from "./supabase";

const SITE_SLUG = "saintjudy";

export async function getSiteConfig() {
  const { data } = await supabase
    .from("sj_site_config")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .single();
  return data || null;
}

export async function getNavigation() {
  const { data } = await supabase
    .from("sj_navigation")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .order("sort_order");
  return data || [];
}

export async function getCategories() {
  const { data } = await supabase
    .from("sj_categories")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .order("sort_order");
  return data || [];
}

export async function getCategory(slug) {
  const { data } = await supabase
    .from("sj_categories")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .eq("category_slug", slug)
    .single();
  return data || null;
}

export async function getJokesByCategory(slug) {
  const { data } = await supabase
    .from("sj_jokes")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .eq("category_slug", slug)
    .order("sort_order");
  return data || [];
}

export async function getAllJokes() {
  const { data } = await supabase
    .from("sj_jokes")
    .select("*")
    .eq("site_slug", SITE_SLUG);
  return data || [];
}

export async function getJokeVotes(jokeIds) {
  if (!jokeIds || jokeIds.length === 0) return {};
  
  const { data } = await supabase
    .from("sj_joke_votes")
    .select("joke_id, vote_type")
    .eq("site_slug", SITE_SLUG)
    .in("joke_id", jokeIds);
  
  const voteCounts = {};
  (data || []).forEach(vote => {
    if (!voteCounts[vote.joke_id]) {
      voteCounts[vote.joke_id] = { up: 0, down: 0 };
    }
    voteCounts[vote.joke_id][vote.vote_type]++;
  });
  
  return voteCounts;
}

export async function getTopJokes(limit = 10) {
  // Get all votes and count them
  const { data: votes } = await supabase
    .from("sj_joke_votes")
    .select("joke_id, vote_type")
    .eq("site_slug", SITE_SLUG);
  
  // Calculate net score (upvotes - downvotes) for each joke
  const voteScores = {};
  (votes || []).forEach(vote => {
    if (!voteScores[vote.joke_id]) {
      voteScores[vote.joke_id] = { up: 0, down: 0 };
    }
    voteScores[vote.joke_id][vote.vote_type]++;
  });
  
  // Calculate net scores and sort
  const sortedJokeIds = Object.entries(voteScores)
    .map(([jokeId, counts]) => ({
      jokeId: parseInt(jokeId),
      score: counts.up - counts.down,
      votes: counts
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(j => j.jokeId);
  
  if (sortedJokeIds.length === 0) return { jokes: [], votes: {} };
  
  // Get the actual joke data
  const { data: jokes } = await supabase
    .from("sj_jokes")
    .select("*")
    .in("id", sortedJokeIds);
  
  // Sort jokes by their score order
  const jokeMap = new Map(jokes.map(j => [j.id, j]));
  const orderedJokes = sortedJokeIds
    .map(id => jokeMap.get(id))
    .filter(Boolean);
  
  return { jokes: orderedJokes, votes: voteScores };
}

export async function getPageSEO(page) {
  const { data } = await supabase
    .from("sj_seo")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .eq("page", page)
    .single();
  return data || null;
}
