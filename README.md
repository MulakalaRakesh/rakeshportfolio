# Cascading Floor Tile Animation — Remotion

Instagram Reels / YouTube Shorts (9:16 · 1080×1920 · 30fps · 6 sec)

## Setup

```bash
npm install
```

## Add Your Tile Images

Copy your 5 tile images into the `/public` folder and name them exactly:

```
public/
  tile1.jpg
  tile2.jpg
  tile3.jpg
  tile4.jpg
  tile5.jpg
```

## Preview in Remotion Studio

```bash
npm start
# or
npx remotion studio
```

Open http://localhost:3000 in your browser.

## Render

```bash
npx remotion render TileFloor out/tile-animation-reels.mp4 --codec=h264
```

The output file will be at `out/tile-animation-reels.mp4`.

## Animation Timeline

| Frame     | Event                                              |
|-----------|----------------------------------------------------|
| 0–120     | 40 tiles cascade in diagonally (top-left → bottom-right), spring physics bounce |
| 120–160   | Gloss shimmer sweep (diagonal white gradient)      |
| 120–150   | Full frame held                                    |
| 150–180   | Fade to black                                      |

## File Structure

```
src/
  compositions/
    TileFloor.tsx   — main composition (grid, tile drop, shimmer, fade)
  Root.tsx          — registers composition with Remotion
  index.ts          — entry point
public/
  tile1.jpg … tile5.jpg
remotion.config.ts
tsconfig.json
package.json
```

## Customisation

| Variable          | File             | What it controls                         |
|-------------------|------------------|------------------------------------------|
| `COLS / ROWS`     | TileFloor.tsx:9  | Grid size (default 4×10 = 40 tiles)      |
| `STAGGER_PER_STEP`| TileFloor.tsx:15 | Delay between diagonal wave steps (frames)|
| `SPRING_CONFIG`   | TileFloor.tsx:18 | Bounce physics (damping / stiffness / mass)|
| `SHIMMER_START`   | TileFloor.tsx    | Frame at which gloss sweep begins         |
| `FADEOUT_START`   | TileFloor.tsx    | Frame at which master fade-out begins     |
