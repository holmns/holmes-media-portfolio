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
    "I am a photographer based in Bangkok. Most of what is here was made away from a schedule: harbour nights in Hong Kong, first light on Fuji, the coast road in southern Italy, glacier water in the Rockies, and a truck parked under the stars a few hours out of the city.",
    "Low light is the thread through all of it. Long exposures, blue hour, available light pushed as far as the sensor will take it, usually one body and a 24-70 f/2.8. I would rather wait out a frame than go looking for an easier one.",
    "The other side of the work is live: stages, field shows and night fire drills, shot in whatever color the lighting rig decides to throw. It taught me to work fast and commit, which is a useful counterweight to all the waiting.",
  ],
  services: ["Landscape stills & portraits", "Live events & stage", "Video, VFX & color grading"],
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
    note: "The opening title sequence, played to the hall before the graduating class walked on.",
    role: "Directed, shot, edited, VFX",
    year: "2025",
    feature: { label: "Intro", runtime: "0:10", youtube: "ZSdLsdhD2U8" },
    breakdown: { label: "VFX breakdown", runtime: "0:24", youtube: "bQo_kL8KPSM" },
  },
  {
    title: "35 Facts About MWIT",
    note: "A tour of my high school in thirty-five facts, shot around the campus.",
    role: "Directed, shot, edited, VFX",
    year: "2025",
    feature: { label: "Full video", runtime: "8:32", youtube: "ygp6PZOXh2A" },
    breakdown: { label: "VFX breakdown", runtime: "0:25", youtube: "ux44o5C7K2s" },
  },
];
