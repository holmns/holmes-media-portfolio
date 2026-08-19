import type { Clip as ClipData } from "@/data/site";
import { frameBox } from "./Frame";

type ClipProps = {
  clip: ClipData;
};

/**
 * One piece of footage in a 16:9 box.
 *
 * A YouTube id becomes a lazy embed, a local file becomes an inline player
 * with controls, and a clip with neither holds its space as a labelled
 * placeholder so the layout is finished before the footage is.
 */
export function Clip({ clip }: ClipProps) {
  return (
    <figure>
      <div className={frameBox} style={{ aspectRatio: 16 / 9 }}>
        {clip.youtube ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${clip.youtube}`}
            title={clip.label}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 h-full w-full"
          />
        ) : clip.file ? (
          <video
            src={`/video/${clip.file}`}
            poster={clip.poster?.src}
            controls
            playsInline
            // Only the first frame up front - these sit below the fold.
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              {clip.label}
            </span>
          </div>
        )}
      </div>

      <figcaption className="mt-3 flex items-baseline justify-between gap-4 font-mono text-[11px] text-muted">
        <span className="uppercase tracking-[0.2em]">{clip.label}</span>
        {clip.runtime && <span className="shrink-0">{clip.runtime}</span>}
      </figcaption>
    </figure>
  );
}
