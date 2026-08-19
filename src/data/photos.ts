/**
 * Photo library.
 *
 * Files live in /public/images but are imported as modules rather than
 * referenced by path: a static import hands next/image the intrinsic width,
 * height and a blur placeholder, so nothing shifts while the page loads.
 *
 * To add a frame: drop the file in /public/images, import it here, and push it
 * onto the right collection with alt text that describes the picture. Camera
 * settings are not stored here - they live in `image-info.json`, keyed by the
 * same filename.
 */

import type { StaticImageData } from "next/image";

import hk1 from "../../public/images/hk_1.webp";
import hk3 from "../../public/images/hk_3.webp";
import hk4 from "../../public/images/hk_4.webp";
import hk5 from "../../public/images/hk_5.webp";
import hk6 from "../../public/images/hk_6.webp";
import hk7 from "../../public/images/hk_7.webp";

import japan1 from "../../public/images/japan_1.webp";
import japan2 from "../../public/images/japan_2.webp";
import japan3 from "../../public/images/japan_3.webp";
import japan4 from "../../public/images/japan_4.webp";
import japan5 from "../../public/images/japan_5.webp";
import japan6 from "../../public/images/japan_6.webp";

import italy1 from "../../public/images/italy_1.webp";
import italy2 from "../../public/images/italy_2.webp";
import italy3 from "../../public/images/italy_3.webp";
import italy4 from "../../public/images/italy_4.webp";
import italy5 from "../../public/images/italy_5.webp";
import italy6 from "../../public/images/italy_6.webp";
import italy7 from "../../public/images/italy_7.webp";
import italy8 from "../../public/images/italy_8.webp";
import italy9 from "../../public/images/italy_9.webp";
import italy10 from "../../public/images/italy_10.webp";
import italy11 from "../../public/images/italy_11.webp";
import italy12 from "../../public/images/italy_12.webp";
import italy13 from "../../public/images/italy_13.webp";
import italy14 from "../../public/images/italy_14.webp";
import italy15 from "../../public/images/italy_15.webp";

import th01 from "../../public/images/th_01.webp";

import usa1 from "../../public/images/usa_1.webp";
import usa2 from "../../public/images/usa_2.webp";

import school1 from "../../public/images/school_1.webp";
import school2 from "../../public/images/school_2.webp";
import school3 from "../../public/images/school_3.webp";
import school4 from "../../public/images/school_4.webp";
import school5 from "../../public/images/school_5.webp";
import school6 from "../../public/images/school_6.webp";
import school7 from "../../public/images/school_7.webp";
import school8 from "../../public/images/school_8.webp";
import school9 from "../../public/images/school_9.webp";
import school10 from "../../public/images/school_10.webp";
import school11 from "../../public/images/school_11.webp";
import school12 from "../../public/images/school_12.webp";
import school13 from "../../public/images/school_13.webp";
import school14 from "../../public/images/school_14.webp";
import school15 from "../../public/images/school_15.webp";
import school16 from "../../public/images/school_16.webp";
import school17 from "../../public/images/school_17.webp";
import school18 from "../../public/images/school_18.webp";
import school19 from "../../public/images/school_19.webp";
import school20 from "../../public/images/school_20.webp";
import school21 from "../../public/images/school_21.webp";

import still1 from "../../public/images/still_1.webp";
import still2 from "../../public/images/still_2.webp";
import still3 from "../../public/images/still_3.webp";
import still4 from "../../public/images/still_4.webp";
import still5 from "../../public/images/still_5.webp";
import still6 from "../../public/images/still_6.webp";

export type Photo = {
  src: StaticImageData;
  /** Filename, which is also the key into `image-info.json`. */
  file: string;
  /** Describes the picture - read aloud by screen readers, shown if it fails to load. */
  alt: string;
};

export type Collection = {
  id: string;
  label: string;
  /** One line under the heading. */
  note: string;
  photos: Photo[];
};

export const collections: Collection[] = [
  {
    id: "hong-kong",
    label: "Hong Kong",
    note: "Harbour nights and the density above street level",
    photos: [
      {
        src: hk1,
        file: "hk_1.webp",
        alt: "Searchlights fanning over the Victoria Harbour skyline at night",
      },
      {
        src: hk3,
        file: "hk_3.webp",
        alt: "Neon shop signs stacked over a street corner after dark",
      },
      {
        src: hk4,
        file: "hk_4.webp",
        alt: "City lights smeared across the water of the harbour",
      },
      {
        src: hk5,
        file: "hk_5.webp",
        alt: "Looking up the courtyard of a housing block, flats stacked to the sky",
      },
      {
        src: hk6,
        file: "hk_6.webp",
        alt: "A lone figure climbing a graffitied concrete stairwell",
      },
      {
        src: hk7,
        file: "hk_7.webp",
        alt: "Pedestrians and their long shadows crossing a striped street, from above",
      },
    ],
  },
  {
    id: "japan",
    label: "Japan",
    note: "Around Fuji, and the quiet after dark",
    photos: [
      {
        src: japan1,
        file: "japan_1.webp",
        alt: "A pagoda framed by pines, cloud sitting on the mountain behind",
      },
      {
        src: japan2,
        file: "japan_2.webp",
        alt: "Mount Fuji at dawn past a bent branch, the pagoda small below",
      },
      {
        src: japan3,
        file: "japan_3.webp",
        alt: "The corner of a house buried in vines, caught in morning light",
      },
      {
        src: japan4,
        file: "japan_4.webp",
        alt: "A convenience store glowing alone on an empty road at night",
      },
      {
        src: japan5,
        file: "japan_5.webp",
        alt: "The red tiers of a pagoda rising against the treeline",
      },
      {
        src: japan6,
        file: "japan_6.webp",
        alt: "Fuji at first light across the lake, a single bird on the water",
      },
    ],
  },
  {
    id: "italy",
    label: "Italy",
    note: "Cliff towns, stone cities and the coast road",
    photos: [
      {
        src: italy1,
        file: "italy_1.webp",
        alt: "A town built out over the cliff above a crowded swimming cove",
      },
      {
        src: italy2,
        file: "italy_2.webp",
        alt: "The same cove at dusk, a small boat holding in the inlet",
      },
      {
        src: italy3,
        file: "italy_3.webp",
        alt: "Stone houses stacked up the side of a ravine",
      },
      {
        src: italy4,
        file: "italy_4.webp",
        alt: "The painted ceiling and gilded nave of a cathedral",
      },
      {
        src: italy5,
        file: "italy_5.webp",
        alt: "A man in a straw hat leaning on a wall above the old town",
      },
      {
        src: italy6,
        file: "italy_6.webp",
        alt: "An evening street under lamplight, shopfronts open, people walking",
      },
      {
        src: italy7,
        file: "italy_7.webp",
        alt: "Headlights drawing a long white line down the coast road at night",
      },
      {
        src: italy8,
        file: "italy_8.webp",
        alt: "The harbour seen through a scratched, salt-blurred window",
      },
      {
        src: italy9,
        file: "italy_9.webp",
        alt: "Low sun over a marina, moored boats and hard backlight",
      },
      {
        src: italy10,
        file: "italy_10.webp",
        alt: "A hazy mountain standing over the harbour town at its foot",
      },
      {
        src: italy11,
        file: "italy_11.webp",
        alt: "Two sea stacks rising straight out of open water",
      },
      {
        src: italy12,
        file: "italy_12.webp",
        alt: "A lighthouse on bare rock under a pale sky",
      },
      {
        src: italy13,
        file: "italy_13.webp",
        alt: "Switchbacks of a cliff path winding down to the sea",
      },
      {
        src: italy14,
        file: "italy_14.webp",
        alt: "A town stacked above its bay, seen from the road above",
      },
      {
        src: italy15,
        file: "italy_15.webp",
        alt: "A bell tower framed between the arches of a cloister",
      },
    ],
  },
  {
    id: "thailand",
    label: "Thailand",
    note: "Out of the city, waiting on the sky",
    photos: [
      {
        src: th01,
        file: "th_01.webp",
        alt: "A truck and rooftop tent lit up under a field of stars",
      },
    ],
  },
  {
    id: "north-america",
    label: "North America",
    note: "Glacier lakes in the Rockies",
    photos: [
      {
        src: usa1,
        file: "usa_1.webp",
        alt: "A glacier at the head of a turquoise lake, boulders in the foreground",
      },
      {
        src: usa2,
        file: "usa_2.webp",
        alt: "A red canoe crossing green water below a forested slope",
      },
    ],
  },
  {
    id: "high-school",
    label: "High School Work",
    note: "Earlier work - stage, sport days and fire drills",
    photos: [
      {
        src: school1,
        file: "school_1.webp",
        alt: "A pageant contestant in a lilac gown and long cape on the field",
      },
      {
        src: school2,
        file: "school_2.webp",
        alt: "A cheer squad holding a tableau, streamers still in the air",
      },
      {
        src: school3,
        file: "school_3.webp",
        alt: "A squad in black jackets and tutus locked into a final pose",
      },
      {
        src: school4,
        file: "school_4.webp",
        alt: "A squad in red and black, arms up on the last beat",
      },
      {
        src: school5,
        file: "school_5.webp",
        alt: "The whole school packed into the gym, seen from the rafters",
      },
      {
        src: school6,
        file: "school_6.webp",
        alt: "Flag bearers in white and blue holding their closing pose",
      },
      {
        src: school7,
        file: "school_7.webp",
        alt: "A guitarist lit green, mid-solo",
      },
      {
        src: school8,
        file: "school_8.webp",
        alt: "A guitarist from behind, red strap across a white shirt",
      },
      {
        src: school9,
        file: "school_9.webp",
        alt: "A singer working the front edge of the stage",
      },
      {
        src: school10,
        file: "school_10.webp",
        alt: "Two firefighters carrying a stretcher down the track at dusk",
      },
      {
        src: school11,
        file: "school_11.webp",
        alt: "A rescue crew walking out under red light",
      },
      {
        src: school12,
        file: "school_12.webp",
        alt: "A team working over a casualty on a board, lit red",
      },
      {
        src: school13,
        file: "school_13.webp",
        alt: "An officer's back, badge and sash, in red light",
      },
      {
        src: school14,
        file: "school_14.webp",
        alt: "A crew moving a stretcher through a red-lit doorway",
      },
      {
        src: school15,
        file: "school_15.webp",
        alt: "A cadet standing at attention in the red corridor",
      },
      {
        src: school16,
        file: "school_16.webp",
        alt: "Two firefighters in helmets under a red colonnade",
      },
      {
        src: school17,
        file: "school_17.webp",
        alt: "A guitarist facing the crowd, spotlights overhead",
      },
      {
        src: school18,
        file: "school_18.webp",
        alt: "A pink and white flag routine closing on the field",
      },
      {
        src: school19,
        file: "school_19.webp",
        alt: "The pageant contestant turning into the low sun",
      },
      {
        src: school20,
        file: "school_20.webp",
        alt: "A singer with a guitar, green light behind",
      },
      {
        src: school21,
        file: "school_21.webp",
        alt: "A guitarist mid-song, backlit through the haze",
      },
    ],
  },
];

/**
 * Frames pulled from the video work, shown inside the video section rather
 * than with the photographs. All six are cut to the same 2.39:1 scope frame,
 * so the grid stays even without any per-frame handling.
 */
export type Still = {
  src?: StaticImageData;
  /** Filename, which is also the key React lays the grid out by. */
  file: string;
  alt: string;
};

export const cinematicStills: Still[] = [
  {
    src: still1,
    file: "still_1.webp",
    alt: "A student in novelty sunglasses pointing down the lens, classmates behind him",
  },
  {
    src: still2,
    file: "still_2.webp",
    alt: "Two students sitting on the grass under big trees, sun low through the branches",
  },
  {
    src: still3,
    file: "still_3.webp",
    alt: "Two students from behind in tall dry grass, backlit by the setting sun",
  },
  {
    src: still4,
    file: "still_4.webp",
    alt: "A student asleep at a steel table in a back kitchen, bag beside them",
  },
  {
    src: still5,
    file: "still_5.webp",
    alt: "Two figures on the walkway of a school block, hard afternoon light on the concrete",
  },
  {
    src: still6,
    file: "still_6.webp",
    alt: "Two students leaning on a rooftop railing above the campus",
  },
];
