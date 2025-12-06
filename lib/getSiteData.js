
import { supabase } from "./supabase";

const SITE_SLUG = "saintjudy";

/* -------------------------------------------------------------
   TEXT UTILITIES
------------------------------------------------------------- */
export function readableSlug(slug) {
  if (!slug) return "";
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}

/* -------------------------------------------------------------
   SITE CONFIG
------------------------------------------------------------- */
export async function getSiteConfig() {
  const { data, error } = await supabase
    .from("sj_site_config")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .single();

  return error ? null : data;
}

/* -------------------------------------------------------------
   NAVIGATION
------------------------------------------------------------- */
export async function getNavigation() {
  const { data } = await supabase
    .from("sj_navigation")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .order("sort_order", { ascending: true });

  return data || [];
}

/* -------------------------------------------------------------
   PARENT CATEGORIES
------------------------------------------------------------- */
export async function getParentCategories() {
  const { data } = await supabase
    .from("sj_categories")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .is("parent_category", null)
    .order("sort_order");

  return data || [];
}

/* -------------------------------------------------------------
   SINGLE CATEGORY
------------------------------------------------------------- */
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
   SUBCATEGORIES
------------------------------------------------------------- */
export async function getSubcategories(parentSlug) {
  const { data } = await supabase
    .from("sj_subcategories")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .eq("parent_slug", parentSlug)
    .order("sort_order");

  return data || [];
}

/* -------------------------------------------------------------
   JOKES — PARENT CATEGORY ONLY
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
   JOKES — SUBCATEGORY FIX (IMPORTANT!)
------------------------------------------------------------- */
export async function getJokesForSubcategory(subSlug) {
  const { data, error } = await supabase
    .from("sj_jokes")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .eq("subcategory_slug", subSlug)
    .order("sort_order");

  if (error) {
    console.error("Error fetching jokes for subcategory:", error);
    return [];
  }

  return data || [];
}

/* -------------------------------------------------------------
   ALL JOKES FOR PARENT CATEGORY (PARENT + ALL CHILDREN)
------------------------------------------------------------- */
export async function getAllJokesForParent(parentSlug) {
  const { data: parentJokes } = await supabase
    .from("sj_jokes")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .eq("category_slug", parentSlug);

  const { data: subs } = await supabase
    .from("sj_subcategories")
    .select("subcategory_slug")
    .eq("site_slug", SITE_SLUG)
    .eq("parent_slug", parentSlug);

  if (!subs || subs.length === 0) return parentJokes || [];

  const slugs = subs.map(s => s.subcategory_slug);

  const { data: childJokes } = await supabase
    .from("sj_jokes")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .in("subcategory_slug", slugs);

  return [
    ...(parentJokes || []),
    ...(childJokes || [])
  ];
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
