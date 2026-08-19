"use client";

import { useState } from "react";
import type { Clip as ClipData } from "@/data/site";
import { frameBox } from "./Frame";

type ClipProps = {
  clip: ClipData;
};

/**
 * Everything YouTube still lets us turn off. `modestbranding` is gone - it has
 * been a no-op since 2023 - so the logo in the control bar is not negotiable
 * once the player is up. What is negotiable is when the player comes up at all,
 * which is what the poster below is for.
 */
const playerParams = new URLSearchParams({
  autoplay: "1",
  // Without this iOS yanks playback into its own fullscreen player.
  playsinline: "1",
  // Keep the end screen on this channel instead of the open grid of suggestions.
  rel: "0",
  // No annotation cards over the footage.
  iv_load_policy: "3",
  // Asks for a white scrubber. The current player still drew the red one on the
  // end screen, so treat this as a request rather than a guarantee.
  color: "white",
}).toString();

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
          <YouTubeClip id={clip.youtube} label={clip.label} />
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

/**
 * The poster carries the frame until someone actually wants to watch.
 *
 * An iframe that has not painted yet renders its own blank document, and a
 * blank document is white - which is what a phone on a slow connection, a
 * deferred lazy load, or a content blocker aimed at youtube-nocookie.com all
 * end up showing. Holding the embed back until the tap means the frame is a
 * still of the film until the moment the player can fill it, and the page owes
 * nothing to a third party until then.
 *
 * The control is an anchor to the watch page that the click handler intercepts,
 * so it is a working link the moment the HTML lands. If the script is slow, was
 * blocked, or never hydrated, the tap still goes somewhere instead of doing
 * nothing.
 */
function YouTubeClip({ id, label }: { id: string; label: string }) {
  const [playing, setPlaying] = useState(false);
  // maxres is the only 16:9 thumbnail, but it is missing on anything never
  // uploaded above 720p, so fall back to the letterboxed 4:3 one and crop it.
  const [poster, setPoster] = useState(
    `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
  );

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- a third-party
          thumbnail is not worth a trip through the image optimizer, and a plain
          img degrades to the dark frame instead of a 500 when ytimg is blocked. */}
      <img
        src={poster}
        alt=""
        loading="lazy"
        decoding="async"
        onError={() => setPoster(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?${playerParams}`}
          title={label}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          // No background of its own, so the poster shows through the gap
          // between mounting the frame and YouTube painting into it.
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <a
          href={`https://www.youtube.com/watch?v=${id}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => {
            // Leave the modified clicks alone - they mean "open it over there".
            if (event.metaKey || event.ctrlKey || event.shiftKey) return;
            event.preventDefault();
            setPlaying(true);
          }}
          aria-label={`Play ${label}`}
          className="group absolute inset-0 grid h-full w-full cursor-pointer place-items-center bg-black/30 transition-colors duration-300 hover:bg-black/10"
        >
          <span className="grid h-14 w-14 place-items-center rounded-full border border-white/70 bg-black/40 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="ml-[3px] h-5 w-5 fill-white"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </a>
      )}
    </>
  );
}
