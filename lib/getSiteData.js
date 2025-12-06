
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

  if (error) {
    console.error("Error fetching site config:", error);
    return null;
  }

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
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching navigation:", error);
    return [];
  }

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
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching parent categories:", error);
    return [];
  }

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
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching all categories:", error);
    return [];
  }

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

  if (error) {
    console.error("Error fetching category:", error);
    return null;
  }

  return data;
}

/* -------------------------------------------------------------
   SUBCATEGORIES (FIXED to use sj_subcategories)
------------------------------------------------------------- */
export async function getSubcategories(parentSlug) {
  const { data, error } = await supabase
    .from("sj_subcategories")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .eq("parent_slug", parentSlug)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching subcategories:", error);
    return [];
  }

  return data || [];
}

/* -------------------------------------------------------------
   JOKES BY CATEGORY
------------------------------------------------------------- */
export async function getJokesByCategory(categorySlug) {
  const { data, error } = await supabase
    .from("sj_jokes")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .eq("category_slug", categorySlug)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching jokes:", error);
    return [];
  }

  return data;
}

/* -------------------------------------------------------------
   ALL JOKES FOR A PARENT (parent + children)
------------------------------------------------------------- */
export async function getAllJokesForParent(parentSlug) {
  // Get parent jokes
  const { data: parentJokes } = await supabase
    .from("sj_jokes")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .eq("category_slug", parentSlug);

  // Get subcategories
  const { data: subs } = await supabase
    .from("sj_subcategories")
    .select("subcategory_slug")
    .eq("site_slug", SITE_SLUG)
    .eq("parent_slug", parentSlug);

  if (!subs || subs.length === 0) {
    return parentJokes || [];
  }

  const subSlugs = subs.map(s => s.subcategory_slug);

  // Get child jokes
  const { data: childJokes } = await supabase
    .from("sj_jokes")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .in("category_slug", subSlugs);

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

  if (error) {
    console.error("Error fetching SEO:", error);
    return null;
  }

  return data;
}
