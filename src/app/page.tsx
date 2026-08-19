import { About } from "@/components/About";
import { Frame } from "@/components/Frame";
import { Header } from "@/components/Header";
import { Photography } from "@/components/Photography";
import { Videography } from "@/components/Videography";
import { site } from "@/data/site";
import portrait from "../../public/images/portrait.webp";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top" className="mx-auto w-full max-w-6xl px-6">
        {/* The name still lands first and alone - the frame under it is the
            argument for reading any further, so it runs the full measure of the
            page and is the one image fetched from the head. */}
        <section className="pb-12 pt-28 sm:pb-16">
          <h1 className="max-w-3xl text-4xl font-medium leading-[1.1] tracking-tight sm:text-6xl">
            {site.name}
          </h1>
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            {site.role}
          </p>
        </section>

        {/* Carries the same gap to the rule below it that the hero text used
            to, so About starts exactly where it always did. */}
        <div className="pb-20 sm:pb-28">
          <Frame
            src={portrait}
            alt="Nawat on a subway platform, back to the camera, a train streaking past behind him"
            ratio={3 / 2}
            sizes="(min-width: 1200px) 1152px, 100vw"
            preload
          />
        </div>

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
