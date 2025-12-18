
import Link from "next/link";

export default function RelatedCategories({ categories }) {
  if (!categories?.length) return null;

  return (
    <section>
      <h2 className="section-title">Try another one</h2>
      <div className="categories-grid">
        {categories.map(c => (
          <Link
            key={c.category_slug}
            href={`/${c.category_slug}`}
            className="category-card"
          >
            <div>{c.emoji}</div>
            <h3>{c.category_name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
