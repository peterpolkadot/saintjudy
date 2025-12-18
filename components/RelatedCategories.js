
import Link from "next/link";
export default function RelatedCategories({ categories }) {
  return (
    <div>
      <h3>Try another</h3>
      {categories.map(c => (
        <Link key={c.category_slug} href={`/${c.category_slug}`}>
          {c.emoji} {c.category_name}
        </Link>
      ))}
    </div>
  );
}
