/**
 * Single place to edit the site copy.
 *
 * Photographs live in `photos.ts`. Films below without a `src` render as a
 * placeholder frame.
 */

import type { StaticImageData } from "next/image";

export const site = {
  name: "Nawat Suangburanakul",
  role: "Photographer - Videographer - Editor",
  location: "Bangkok, TH",
  email: "nawathome@gmail.com",
  bio: [
    "When I was a kid, I'd sit through anything just to watch how a movie shot was built - the light, the cinematography, the effects that made the impossible look real. It always excited me.",
    "Fortunately, my father had an old camera lying around, and once I got my hands on it, that curiosity found somewhere to go. I started with stills, bringing my camera to every place I went and capturing everything I saw.",
    "Fast-forward to today, that same fascination runs in two directions at once: photography, where I'm still chasing that one frame, and cinematography and VFX, where I get to build the kind of images that pulled me in as a kid in the first place. Different tools, same reason I started.",
  ],
  skills: ["Landscape stills & portraits", "Live events & stage", "Video, VFX & color grading"],
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/holmns_/" },
    { label: "TikTok", href: "https://www.tiktok.com/@holmns_" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/nawat-suangburanakul-201b07377/",
    },
  ],
} as const;

export type Clip = {
  /** Sits under the frame, e.g. "Breakdown". */
  label: string;
  /** Shown next to the label. Leave empty to hide it. */
  runtime: string;
  /**
   * File in /public/video, e.g. "showcase.mp4". Played inline with controls.
   */
  file?: string;
  /**
   * YouTube id for a piece that is public there - the part after `v=`. Takes
   * precedence over `file` and renders as an embed rather than a local player.
   */
  youtube?: string;
  /** Poster frame, imported the same way the photographs are. */
  poster?: StaticImageData;
};

export type Film = {
  title: string;
  /** One line on what the piece is. */
  note: string;
  /** What I did on it. */
  role: string;
  year: string;
  /** The piece itself. */
  feature: Clip;
  /** How it was put together. */
  breakdown: Clip;
};

/**
 * Two projects, each shown as the finished piece next to its VFX breakdown.
 * A clip with neither `youtube` nor `file` renders as a labelled placeholder,
 * so the layout is complete before the footage lands.
 */
export const videography: Film[] = [
  {
    title: "High School Graduation Day Video Intro",
    note: "The opening title sequence, played to the graduating class.",
    role: "Directed, shot, edited, VFX",
    year: "2025",
    feature: { label: "Intro", runtime: "0:10", youtube: "ZSdLsdhD2U8" },
    breakdown: { label: "VFX breakdown", runtime: "0:24", youtube: "bQo_kL8KPSM" },
  },
  {
    title: "35 Facts About MWIT",
    note: "A tour of my high school in thirty-five facts, shot around the campus.",
    role: "Directed, shot, edited, VFX",
    year: "2024",
    feature: { label: "Full video", runtime: "8:32", youtube: "ygp6PZOXh2A" },
    breakdown: { label: "VFX breakdown", runtime: "0:25", youtube: "ux44o5C7K2s" },
  },
];
