import { collections } from "@/data/photos";
import { PhotoGrid } from "./PhotoGrid";
import { Section } from "./Section";

export function Photography() {
  return (
    <Section id="photography" index="02" title="Photography">
      {/* Jump list - six collections is more than a visitor should have to
          scroll blind through. */}
      <nav className="-mt-4 mb-14 flex flex-wrap gap-x-6 gap-y-2 sm:-mt-6">
        {collections.map((collection) => (
          <a
            key={collection.id}
            href={`#${collection.id}`}
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground"
          >
            {collection.label}
          </a>
        ))}
      </nav>

      <div className="space-y-20 sm:space-y-28">
        {collections.map((collection, collectionIndex) => (
          <div key={collection.id} id={collection.id} className="scroll-mt-28">
            <header className="mb-8 border-b border-border pb-4 sm:mb-10">
              <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">
                {collection.label}
              </h3>
              <div className="mt-2 flex items-baseline justify-between gap-6">
                <p className="text-sm text-muted">{collection.note}</p>
                <p className="shrink-0 font-mono text-[11px] text-muted">
                  {collection.photos.length}{" "}
                  {collection.photos.length === 1 ? "frame" : "frames"}
                </p>
              </div>
            </header>

            <PhotoGrid
              photos={collection.photos}
              seed={collection.id}
              preloadFirst={collectionIndex === 0}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
