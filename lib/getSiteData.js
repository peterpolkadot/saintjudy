
import { supabase } from "./supabase";

const SITE_SLUG = "saintjudy";

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

export async function getCategories() {
  const { data, error } = await supabase
    .from("sj_categories")
    .select("*")
    .eq("site_slug", SITE_SLUG)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data;
}

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
