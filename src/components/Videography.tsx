import { cinematicStills } from "@/data/photos";
import { videography } from "@/data/site";
import { Clip } from "./Clip";
import { Frame } from "./Frame";
import { Section } from "./Section";

export function Videography() {
  return (
    <Section id="video" index="03" title="Videography & VFX">
      <div className="space-y-20 sm:space-y-28">
        {videography.map((film) => (
          <article key={film.title}>
            <header className="mb-8 border-b border-border pb-4 sm:mb-10">
              <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">
                {film.title}
              </h3>
              <div className="mt-2 flex items-baseline justify-between gap-6">
                <p className="text-sm text-muted">{film.note}</p>
                <p className="shrink-0 font-mono text-[11px] text-muted">
                  {film.year}
                </p>
              </div>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                {film.role}
              </p>
            </header>

            {/* The finished piece leads, the breakdown sits beside it at the
                size of a footnote rather than a second headline. */}
            <div className="grid items-start gap-6 md:grid-cols-[1.6fr_1fr] md:gap-8">
              <Clip clip={film.feature} />
              <Clip clip={film.breakdown} />
            </div>
          </article>
        ))}

        <div id="stills" className="scroll-mt-28">
          <header className="mb-8 border-b border-border pb-4 sm:mb-10">
            <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">
              Cinematic Stills
            </h3>
            <div className="mt-2 flex items-baseline justify-between gap-6">
              <p className="text-sm text-muted">Stills from my other video projects</p>
              <p className="shrink-0 font-mono text-[11px] text-muted">
                {cinematicStills.length} frames
              </p>
            </div>
          </header>

          {/* Two up rather than three - a 2.39:1 frame three across is a
              letterbox strip and nothing reads in it. */}
          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {cinematicStills.map((still) => (
              <li key={still.file}>
                <Frame
                  src={still.src}
                  alt={still.alt}
                  ratio={2400 / 1004}
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
