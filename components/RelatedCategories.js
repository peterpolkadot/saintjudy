
import Link from "next/link";

export default function RelatedCategories({ categories }) {
  return (
    <div className="related-categories">
      <h2 className="section-title">Try Another Category</h2>
      <div className="related-grid">
        {categories.slice(0, 3).map((cat) => (
          <Link 
            key={cat.category_slug} 
            href={`/${cat.category_slug}`} 
            className="related-card"
          >
            <div className="related-emoji">{cat.emoji}</div>
            <h3>{cat.category_name}</h3>
          </Link>
        ))}
      </div>
      <div className="home-button-container">
        <Link href="/" className="home-button">
          🏠 Back to Home
        </Link>
      </div>
    </div>
  );
}
