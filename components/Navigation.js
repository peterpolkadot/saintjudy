
import Link from "next/link";

export default function Navigation({ config, links }) {
  return (
    <nav className="nav">
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          {config?.logo_text}
        </Link>
        <div className="nav-links">
          {links.map((l, i) => (
            <Link key={i} href={l.link}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
