
import Link from "next/link";

export default function RelatedCategories({ categories }) {
  return (
    <section>
<div className="section-card">
  <h2>Try Another Category</h2>
</div>


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
<div style={{ textAlign: "center", margin: "3rem" }}>
  <a href="/" className="pink-btn">🏠 Back to Home</a>
</div>


    </section>
  );
}
