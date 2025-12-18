
import Link from "next/link";
export default function Navigation({ config, links }) {
  if (!config) return null;
  return (
    <nav>
      <Link href="/">{config.logo_text}</Link>
      {links.map((l,i) => <Link key={i} href={l.link}>{l.label}</Link>)}
    </nav>
  );
}
