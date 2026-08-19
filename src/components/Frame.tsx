import Image, { type StaticImageData } from "next/image";

/** Shell shared by anything that fills a media box: image, video, embed. */
export const frameBox =
  "relative w-full overflow-hidden border border-border bg-surface";

type FrameProps = {
  src?: StaticImageData;
  alt: string;
  /** Width over height, e.g. 3 / 2. Falls back to the file's own ratio. */
  ratio?: number;
  /** next/image `sizes` hint for responsive loading */
  sizes: string;
  /** Fetch in the document head - reserve it for the one hero frame. */
  preload?: boolean;
  children?: React.ReactNode;
};

/**
 * Media frame. Renders an optimized image when `src` is set, otherwise a
 * neutral placeholder so the layout is complete before the real work lands.
 *
 * Statically imported images carry their own dimensions and blur data, so the
 * box is reserved at the right shape and fades up rather than popping in.
 */
export function Frame({ src, alt, ratio, sizes, preload, children }: FrameProps) {
  const aspectRatio = ratio ?? (src ? src.width / src.height : 4 / 5);

  return (
    <div
      className={frameBox}
      style={{ aspectRatio }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          placeholder="blur"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            {alt}
          </span>
        </div>
      )}
      {children}
    </div>
  );
}
