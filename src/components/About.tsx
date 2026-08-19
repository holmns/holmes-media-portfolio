import { site } from "@/data/site";
import { Programs } from "./Programs";
import { Section } from "./Section";

export function About() {
  return (
    <Section id="about" index="01" title="About">
      <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:gap-16">
        <div className="space-y-6">
          {site.bio.map((paragraph) => (
            <p
              key={paragraph}
              className="text-lg leading-relaxed text-foreground/90 sm:text-xl"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <dl className="space-y-8 text-sm">
          <div>
            <dt className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Skills
            </dt>
            <dd>
              <ul className="space-y-1.5 text-foreground/90">
                {site.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </dd>
          </div>

          <div>
            <dt className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Programs
            </dt>
            <dd>
              <Programs />
            </dd>
          </div>

          <div>
            <dt className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Based in
            </dt>
            <dd className="text-foreground/90">{site.location}</dd>
          </div>

          <div>
            <dt className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Contact
            </dt>
            <dd>
              <a
                href={`mailto:${site.email}`}
                className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
              >
                {site.email}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </Section>
  );
}
