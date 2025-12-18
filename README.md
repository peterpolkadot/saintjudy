
# Saint Judy - Judy's Jokes

Kids joke website with 53 categories powered by Google Sheets + Supabase.

## Structure
- 15 parent categories
- 38 subcategories  
- 53 total joke pages

## Setup in Vercel

Add environment variables:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

## Pages

- / (home - shows parent categories)
- /categories (shows parent categories)
- /[category] (parent category page with subcategory cards)
- /[category]/[subcategory] (child category page with jokes only)

## SEO Features

### Structured Data (Schema.org)
- ✅ Website schema on all pages
- ✅ Breadcrumb navigation schema
- ✅ CollectionPage schema for joke categories
- ✅ CreativeWork schema for individual jokes
- ✅ Audience targeting (ages 5-12)

### Meta Tags
- Dynamic titles per page
- Optimized descriptions
- Keywords from database

## Testing SEO

Test structured data with:
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org/

View source on any page to see JSON-LD structured data in <head>.
