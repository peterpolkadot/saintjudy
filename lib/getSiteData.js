
import { supabase } from "./supabase";

const SITE_SLUG = "saintjudy";

export function readableSlug(slug) {
  if (!slug) return "";
  return slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

/* -------------------------------------------------------------
   SITE CONFIG
------------------------------------------------------------- */
export async function getSiteConfig() {
  const { data } = await supabase
    .from("sj_site_config")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .single();

  return data || null;
}

/* -------------------------------------------------------------
   NAVIGATION
------------------------------------------------------------- */
export async function getNavigation() {
  const { data } = await supabase
    .from("sj_navigation")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .order("sort_order");

  return data || [];
}

/* -------------------------------------------------------------
   CATEGORIES
------------------------------------------------------------- */
export async function getCategories() {
  const { data } = await supabase
    .from("sj_categories")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .order("sort_order");

  return data || [];
}

export async function getCategory(categorySlug) {
  const { data } = await supabase
    .from("sj_categories")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .eq("category_slug", categorySlug)
    .single();

  return data || null;
}

/* -------------------------------------------------------------
   JOKES (CATEGORY ONLY)
------------------------------------------------------------- */
export async function getJokesByCategory(categorySlug) {
  const { data } = await supabase
    .from("sj_jokes")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .eq("category_slug", categorySlug)
    .order("sort_order");

  return data || [];
}

/* -------------------------------------------------------------
   SEO
------------------------------------------------------------- */
export async function getPageSEO(page) {
  const { data } = await supabase
    .from("sj_seo")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .eq("page", page)
    .single();

  return data || null;
}
