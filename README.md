
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

### Structured Data (Lean Implementation)
- ✅ Website schema in layout
- ✅ CollectionPage schema on category/subcategory pages (first 10 jokes)
- ✅ Individual jokes marked as CreativeWork

### Meta Tags
- Dynamic titles per page
- Optimized descriptions  
- Keywords from database

## Test SEO
https://search.google.com/test/rich-results
