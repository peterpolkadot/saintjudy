
import { 
  getCategory, 
  getSubcategories, 
  getJokesForSubcategory, 
  readableSlug 
} from "@/lib/getSiteData";

export default async function SubcategoryPage({ params }) {
  const parentSlug = params.category;
  const subcategorySlug = params.subcategory;

  // Load parent category
  const parent = await getCategory(parentSlug);

  // Load subcategories for sidebar navigation
  const subcategories = await getSubcategories(parentSlug);

  // Load jokes FOR THIS subcategory
  const jokes = await getJokesForSubcategory(subcategorySlug);

  return (
    <div className="page-container">
      <h1 className="page-title">
        {parent?.emoji} {readableSlug(subcategorySlug)}
      </h1>

      {/* Subcategory selector */}
      <div className="subcategory-list">
        {subcategories.map((s) => (
          <a
            key={s.subcategory_slug}
            href={"/"+parentSlug+"/"+s.subcategory_slug}
            className={s.subcategory_slug === subcategorySlug ? "active" : ""}
          >
            {s.emoji} {s.subcategory_name}
          </a>
        ))}
      </div>

      {/* Joke List */}
      <div className="joke-list">
        {jokes.length === 0 && (
          <p>No jokes found in this category yet!</p>
        )}

        {jokes.map((j, i) => (
          <div key={i} className="joke-card">
            <h3>{j.emoji} {j.setup}</h3>
            <p>{j.punchline}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
