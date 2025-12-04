
export default function Footer({ config }) {
  if (!config) return null;

  return (
    <footer className="footer">
      <div className="container">
        <p>{config.footer_text || "© 2025 Judy's Jokes"}</p>
      </div>
    </footer>
  );
}
