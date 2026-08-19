import imageInfo from "@/data/image-info.json";
import type { Photo } from "@/data/photos";
import { TIERS, chooseOrder, isWide, packWaterfall } from "@/lib/masonry";
import { Frame } from "./Frame";

type ImageInfo = {
  camera?: string;
  lens?: string;
  shutter?: string;
  aperture?: string;
  iso?: string;
};

const info: Record<string, ImageInfo | undefined> = imageInfo;

/** Exposure on one line, body and glass on the next. Blank fields drop out. */
function readCaption(file: string) {
  const entry = info[file];
  const join = (parts: (string | undefined)[]) =>
    parts.map((part) => part?.trim()).filter(Boolean).join("  ·  ");

  return {
    exposure: join([entry?.shutter, entry?.aperture, entry?.iso && `ISO ${entry.iso}`]),
    body: join([entry?.camera, entry?.lens]),
  };
}

type PhotoGridProps = {
  photos: Photo[];
  /** Seeds the arrangement search - same seed, same layout on every build. */
  seed: string;
  /** Fetch the top-left frame early. Reserve it for the first grid on the page. */
  preloadFirst?: boolean;
};

export function PhotoGrid({ photos, seed, preloadFirst }: PhotoGridProps) {
  const ratio = (photo: Photo) => photo.src.width / photo.src.height;
  const ordered = chooseOrder(photos, ratio, seed);
  const ratios = ordered.map(ratio);
  const grids = TIERS.map((tier) => packWaterfall(ratios, tier.columns, tier.wideSpan));

  const trackVars = Object.fromEntries(
    grids.map((grid, tier) => [`--h-${tier + 1}`, grid.height]),
  );

  return (
    <div className="photo-grid">
      <ul className="photo-grid-track" style={trackVars}>
        {ordered.map((photo, index) => {
          const { exposure, body } = readCaption(photo.file);
          const cellVars = Object.fromEntries(
            grids.flatMap((grid, tier) => {
              const box = grid.boxes[index];
              return [
                [`--x-${tier + 1}`, box.left],
                [`--y-${tier + 1}`, box.top],
                [`--w-${tier + 1}`, box.width],
              ];
            }),
          );

          return (
            <li key={photo.file} className="photo-grid-cell" style={cellVars}>
              <figure>
                <Frame
                  src={photo.src}
                  alt={photo.alt}
                  // Mirrors the tiers in masonry.ts. Wide frames take two of
                  // the three columns, so they must ask for twice the pixels.
                  sizes={
                    isWide(ratios[index])
                      ? "(min-width: 950px) 66vw, 100vw"
                      : "(min-width: 950px) 33vw, (min-width: 630px) 50vw, 100vw"
                  }
                  preload={preloadFirst && index === 0}
                />
                {/* Height is reserved whether or not the settings are filled
                    in, so entering them later cannot reflow the grid. Blank
                    lines are dropped rather than held open, so a half-filled
                    entry does not read as a typo. */}
                <figcaption className="mt-3 h-9 font-mono text-[11px] leading-[1.125rem]">
                  {exposure && <span className="block truncate text-muted">{exposure}</span>}
                  {body && <span className="block truncate text-muted/70">{body}</span>}
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
