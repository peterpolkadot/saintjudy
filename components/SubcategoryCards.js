
import Link from "next/link";

export default function SubcategoryCards({ subcategories, parentSlug }) {
  return (
    <div className="subcategories-section">
      <h2 className="section-title">More {parentSlug.replace('-', ' ')} Categories</h2>
      <div className="categories-grid">
        {subcategories.map((subcat) => (
          <Link 
            key={subcat.category_slug} 
            href={`/${parentSlug}/${subcat.category_slug}`} 
            className="category-card"
          >
            {subcat.image_url && (
              <div className="category-image">
                <img src={subcat.image_url} alt={subcat.category_name} />
              </div>
            )}
            {!subcat.image_url && <div className="category-emoji">{subcat.emoji}</div>}
            <h3>{subcat.category_name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
