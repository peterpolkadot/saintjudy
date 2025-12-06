
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

  if (error) return null;
  return data;
}

/* -------------------------------------------------------------
   NAVIGATION
------------------------------------------------------------- */
export async function getNavigation() {
  const { data, error } = await supabase
    .from("sj_navigation")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .order("sort_order");

  if (error) return [];
  return data;
}

/* -------------------------------------------------------------
   PARENT CATEGORIES
------------------------------------------------------------- */
export async function getParentCategories() {
  const { data, error } = await supabase
    .from("sj_categories")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .is("parent_category", null)
    .order("sort_order");

  if (error) return [];
  return data;
}

/* -------------------------------------------------------------
   ALL CATEGORIES
------------------------------------------------------------- */
export async function getAllCategories() {
  const { data, error } = await supabase
    .from("sj_categories")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .order("sort_order");

  if (error) return [];
  return data;
}

/* -------------------------------------------------------------
   SINGLE CATEGORY
------------------------------------------------------------- */
export async function getCategory(categorySlug) {
  const { data, error } = await supabase
    .from("sj_categories")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .eq("category_slug", categorySlug)
    .single();

  if (error) return null;
  return data;
}

/* -------------------------------------------------------------
   SUBCATEGORIES
------------------------------------------------------------- */
export async function getSubcategories(parentSlug) {
  const { data, error } = await supabase
    .from("sj_subcategories")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .eq("parent_slug", parentSlug)
    .order("sort_order");

  if (error) return [];
  return data || [];
}

/* -------------------------------------------------------------
   JOKES FOR A SUBCATEGORY
------------------------------------------------------------- */
export async function getJokesForSubcategory(subSlug) {
  const { data, error } = await supabase
    .from("sj_jokes")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .eq("subcategory_slug", subSlug)
    .order("sort_order");

  if (error) return [];
  return data || [];
}

/* -------------------------------------------------------------
   ALL JOKES FOR A PARENT (parent + subs)
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

  if (!subs || subs.length === 0) {
    return parentJokes || [];
  }

  const subSlugs = subs.map(s => s.subcategory_slug);

  const { data: childJokes } = await supabase
    .from("sj_jokes")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .in("subcategory_slug", subSlugs);

  return [
    ...(parentJokes || []),
    ...(childJokes || [])
  ];
}

/* -------------------------------------------------------------
   SEO
------------------------------------------------------------- */
export async function getPageSEO(page) {
  const { data, error } = await supabase
    .from("sj_seo")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .eq("page", page)
    .single();

  if (error) return null;
  return data;
}
