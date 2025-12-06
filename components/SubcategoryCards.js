
import Link from "next/link";

export default function SubcategoryCards({ subcategories, parentSlug }) {
  return (
    <div className="subcategories-section">
      <h2 className="section-title">More {parentSlug.replace('-', ' ')} Categories</h2>

      <div className="categories-grid">
        {subcategories.map((sub) => (
          <Link
            key={sub.subcategory_slug}
            href={`/${parentSlug}/${sub.subcategory_slug}`}
            className="category-card"
          >
            {sub.image_url && (
              <div className="category-image">
                <img src={sub.image_url} alt={sub.subcategory_name} />
              </div>
            )}

            {!sub.image_url && (
              <div className="category-emoji">{sub.emoji}</div>
            )}

            <h3>{sub.subcategory_name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
