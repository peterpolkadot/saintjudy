
import Link from "next/link";

export default function Navigation({ config, links }) {
  if (!config) return null;

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          {config.logo_text || "Judy's Jokes"}
        </Link>
        <div className="nav-links">
          {links.map((link, i) => (
            <Link key={i} href={link.link}>{link.label}</Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
