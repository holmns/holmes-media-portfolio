import { About } from "@/components/About";
import { Header } from "@/components/Header";
import { Photography } from "@/components/Photography";
import { Videography } from "@/components/Videography";
import { site } from "@/data/site";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top" className="mx-auto w-full max-w-6xl px-6">
        <section className="flex min-h-[52vh] flex-col justify-end pb-20 pt-28 sm:min-h-[58vh]">
          <h1 className="max-w-3xl text-4xl font-medium leading-[1.1] tracking-tight sm:text-6xl">
            {site.name}
          </h1>
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            {site.role}
          </p>
        </section>

        <About />
        <Photography />
        <Videography />
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <a
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-foreground"
          >
            {site.email}
          </a>
          <nav className="flex gap-6">
            {site.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foreground"
              >
                {social.label}
              </a>
            ))}
          </nav>
          <p>
            &copy; {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </footer>
    </>
  );
}
