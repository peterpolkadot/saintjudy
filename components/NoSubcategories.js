
export default function NoSubcategories({ name }) {
  return (
    <div className="no-subcategories">
      <h2 className="section-title">No Subcategories</h2>
      <p className="section-subtitle">
        There aren't any subcategories inside <strong>{name}</strong> yet.
      </p>
    </div>
  );
}
