/**
 * Waterfall packing for the photo grid.
 *
 * CSS multi-column masonry cannot make one item wider than its column, and
 * landscapes want the room. So the layout is solved here instead: every frame
 * is placed absolutely, landscapes spanning two columns, each one dropped into
 * whichever column is currently shortest.
 *
 * Positions are computed once on the server and shipped as CSS `calc()`
 * strings - no measuring, no layout pass, nothing to hydrate.
 *
 * The mixed unit is the trick. Column widths scale with the container (`cqw`,
 * 1% of the grid's inline size) while gaps and captions are fixed text-sized
 * blocks (`rem`). Every coordinate is therefore `a * 1cqw + b * 1rem`, which
 * stays exact at any width.
 */

/** A length as `cqw + rem`, kept apart so it resolves correctly at any width. */
type Unit = { cqw: number; rem: number };

const add = (a: Unit, b: Unit): Unit => ({ cqw: a.cqw + b.cqw, rem: a.rem + b.rem });
const scale = (a: Unit, k: number): Unit => ({ cqw: a.cqw * k, rem: a.rem * k });

/**
 * Upper bound of two lengths. Taking each unit's max separately overshoots a
 * little, but it is the only bound that holds at *every* container width -
 * which is what keeps a two-column frame from ever landing on its neighbour.
 */
const ceilBoth = (a: Unit, b: Unit): Unit => ({
  cqw: Math.max(a.cqw, b.cqw),
  rem: Math.max(a.rem, b.rem),
});

/** Rough pixel value, used only to decide which column is shortest. */
const weigh = (u: Unit) => u.cqw * 11 + u.rem * 16;

const css = (u: Unit) => {
  const cqw = Math.round(u.cqw * 1e4) / 1e4;
  const rem = Math.round(u.rem * 1e4) / 1e4;
  return `calc(${cqw}cqw + ${rem}rem)`;
};

/** Gutter between frames, and the caption strip reserved under each one. */
export const GAP_REM = 1.5;
export const CAPTION_REM = 3;

/** Grid widths, narrowest first. A frame is placed by the widest tier that fits. */
export const TIERS = [
  { columns: 1, wideSpan: 1 },
  { columns: 2, wideSpan: 2 },
  { columns: 3, wideSpan: 2 },
] as const;

/** Anything at least this wide earns a two-column slot. */
const WIDE_RATIO = 1.2;

export const isWide = (ratio: number) => ratio >= WIDE_RATIO;

export type Box = { left: string; top: string; width: string };
export type PackedGrid = {
  boxes: Box[];
  height: string;
  /** How uneven the bottom edge is, in rough pixels. Lower is better. */
  slack: number;
};

export function packWaterfall(ratios: number[], columns: number, wideSpan: number): PackedGrid {
  const gap: Unit = { cqw: 0, rem: GAP_REM };
  /** One column, after the gutters have been taken out of the full width. */
  const column: Unit = { cqw: 100 / columns, rem: (-GAP_REM * (columns - 1)) / columns };
  const pitch = add(column, gap);
  /** What each frame adds below its image: caption strip plus the gutter. */
  const footer: Unit = { cqw: 0, rem: CAPTION_REM + GAP_REM };

  const filled: Unit[] = Array.from({ length: columns }, () => ({ cqw: 0, rem: 0 }));

  /** Rightmost edge reached, so a grid that never fills its width can be centred. */
  let reachRight: Unit = { cqw: 0, rem: 0 };

  const boxes = ratios.map((ratio) => {
    const span = Math.min(isWide(ratio) ? wideSpan : 1, columns);
    const width = add(scale(column, span), scale(gap, span - 1));

    // Shortest-column-first, reading left to right on a tie.
    let start = 0;
    let best = Infinity;
    for (let c = 0; c + span <= columns; c++) {
      let candidate = 0;
      for (let j = c; j < c + span; j++) candidate = Math.max(candidate, weigh(filled[j]));
      if (candidate < best - 0.001) {
        best = candidate;
        start = c;
      }
    }

    let top: Unit = { cqw: 0, rem: 0 };
    for (let j = start; j < start + span; j++) top = ceilBoth(top, filled[j]);

    const next = add(top, add(scale(width, 1 / ratio), footer));
    for (let j = start; j < start + span; j++) filled[j] = next;

    const left = scale(pitch, start);
    const right = add(left, width);
    if (weigh(right) > weigh(reachRight)) reachRight = right;

    return { left, top, width };
  });

  // A collection with fewer frames than columns would otherwise sit hard left
  // with dead space beside it. Nudge the whole thing to the middle instead.
  const indent = scale(add({ cqw: 100, rem: 0 }, scale(reachRight, -1)), 0.5);
  const placed = boxes.map((box) => ({
    left: css(add(box.left, indent)),
    top: css(box.top),
    width: css(box.width),
  }));

  let tallest: Unit = { cqw: 0, rem: 0 };
  for (const height of filled) tallest = ceilBoth(tallest, height);
  // The last row still carries a trailing gutter it does not need.
  tallest = add(tallest, { cqw: 0, rem: -GAP_REM });

  const reach = filled.map(weigh);
  const slack = Math.max(...reach) - Math.min(...reach);

  return { boxes: placed, height: css(tallest), slack };
}

/** Deterministic shuffle, seeded so a build is reproducible. */
function shuffle<T>(items: T[], seed: string): T[] {
  let state = 2166136261;
  for (const character of seed) {
    state = Math.imul(state ^ character.charCodeAt(0), 16777619) >>> 0;
  }
  const next = () => (state = (Math.imul(state, 1664525) + 1013904223) >>> 0) / 2 ** 32;

  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** How many arrangements to audition before settling on one. */
const CANDIDATES = 60;

/**
 * Pick an order for a collection.
 *
 * Shuffling alone scatters the wide frames nicely but leaves the bottom edge
 * ragged - one column running hundreds of pixels past its neighbours. So the
 * shuffle is run many times and the most level arrangement wins.
 *
 * One order has to serve every tier, so the score sums the raggedness of all
 * of them: an order that levels the three-column grid by wrecking the
 * two-column one is not an improvement. Deterministic - same photos, same
 * result every build.
 */
export function chooseOrder<T>(items: T[], ratioOf: (item: T) => number, seed: string): T[] {
  let best = items;
  let bestSlack = Infinity;

  for (let attempt = 0; attempt < CANDIDATES; attempt++) {
    const candidate = shuffle(items, `${seed}/${attempt}`);
    const ratios = candidate.map(ratioOf);
    const slack = TIERS.reduce(
      (total, tier) => total + packWaterfall(ratios, tier.columns, tier.wideSpan).slack,
      0,
    );
    if (slack < bestSlack) {
      bestSlack = slack;
      best = candidate;
    }
  }

  return best;
}
