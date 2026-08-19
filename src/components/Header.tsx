import Link from "next/link";
import { site } from "@/data/site";

const nav = [
  { href: "#about", label: "About" },
  { href: "#photography", label: "Photography" },
  { href: "#video", label: "Video" },
];

/** "Nawat Suangburanakul" -> "Nawat S.", for when the full name and the three
    nav links stop fitting on one line. */
const shortName = (() => {
  const parts = site.name.split(" ");
  const last = parts.length > 1 ? parts[parts.length - 1] : "";
  return last ? `${parts[0]} ${last[0]}.` : site.name;
})();

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="#top"
          className="text-sm font-medium tracking-tight text-foreground"
        >
          <span className="sm:hidden">{shortName}</span>
          <span className="hidden sm:inline">{site.name}</span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
