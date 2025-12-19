
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

export async function getPageSEO(page) {
  const { data } = await supabase
    .from("sj_seo")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .eq("page", page)
    .single();
  return data || null;
}
