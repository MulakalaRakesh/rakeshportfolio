import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  staticFile,
  Sequence,
  AbsoluteFill,
} from "remotion";

// Grid dimensions
const COLS = 4;
const ROWS = 10;
const TOTAL_TILES = COLS * ROWS;

// Tile images cycling through 5 variants
const TILE_IMAGES = [
  staticFile("tile1.jpg"),
  staticFile("tile2.jpg"),
  staticFile("tile3.jpg"),
  staticFile("tile4.jpg"),
  staticFile("tile5.jpg"),
];

// Stagger: each diagonal wave step adds this many frames
const STAGGER_PER_STEP = 3;

// Spring config for the drop-and-snap physics
const SPRING_CONFIG = {
  damping: 14,
  stiffness: 180,
  mass: 0.8,
};

interface TileProps {
  col: number;
  row: number;
  tileWidth: number;
  tileHeight: number;
}

const Tile: React.FC<TileProps> = ({ col, row, tileWidth, tileHeight }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Diagonal cascade: top-left first, bottom-right last
  const diagonalIndex = col + row;
  const delayFrames = diagonalIndex * STAGGER_PER_STEP;

  // Tile index for image selection — distribute evenly across 5 images
  const tileIndex = (col * ROWS + row) % TILE_IMAGES.length;
  const imageSrc = TILE_IMAGES[tileIndex];

  // Spring progress: starts at delayFrames, runs for ~40 frames
  const localFrame = Math.max(0, frame - delayFrames);
  const progress = spring({
    frame: localFrame,
    fps,
    config: SPRING_CONFIG,
  });

  // translateY: from -300px (above viewport) to 0
  const translateY = interpolate(progress, [0, 1], [-300, 0]);

  // Rotation: from 8deg tilt to 0
  const rotate = interpolate(progress, [0, 1], [8, 0]);

  // Opacity: quick fade in during first 30% of spring
  const opacity = interpolate(progress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: col * tileWidth,
        top: row * tileHeight,
        width: tileWidth,
        height: tileHeight,
        opacity,
        transform: `translateY(${translateY}px) rotate(${rotate}deg)`,
        boxShadow: "0 8px 24px rgba(0,0,0,0.6), 0 2px 6px rgba(0,0,0,0.4)",
        overflow: "hidden",
        // Tiny gap between tiles for realism
        outline: "1px solid rgba(0,0,0,0.15)",
      }}
    >
      <img
        src={imageSrc}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
        alt=""
      />
    </div>
  );
};

// Gloss shimmer overlay: diagonal white gradient sweeping top-left to bottom-right
const GlossShimmer: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  // Shimmer starts at frame 120 (after all tiles land), sweeps over ~40 frames
  const SHIMMER_START = 120;
  const SHIMMER_DURATION = 40;

  const localFrame = frame - SHIMMER_START;

  // Sweep progress 0→1
  const sweepProgress = interpolate(localFrame, [0, SHIMMER_DURATION], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // The gradient band moves diagonally. We shift the gradient position
  // from off-screen top-left to off-screen bottom-right
  const diagonalLength = Math.sqrt(width * width + height * height);

  // Position along diagonal: starts at -30% (off-screen), ends at 130%
  const bandCenter = interpolate(sweepProgress, [0, 1], [-0.3, 1.3]);
  const bandCenterPx = bandCenter * diagonalLength;

  // Shimmer opacity envelope: fades in and out
  const shimmerOpacity = interpolate(
    sweepProgress,
    [0, 0.1, 0.5, 0.9, 1],
    [0, 0.6, 0.35, 0.6, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (sweepProgress === 0) return null;

  // Build a diagonal gradient (45°) that sweeps across
  const gradientStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    opacity: shimmerOpacity,
    background: `linear-gradient(
      135deg,
      transparent ${bandCenter * 100 - 12}%,
      rgba(255,255,255,0.55) ${bandCenter * 100 - 4}%,
      rgba(255,255,255,0.85) ${bandCenter * 100}%,
      rgba(255,255,255,0.55) ${bandCenter * 100 + 4}%,
      transparent ${bandCenter * 100 + 12}%
    )`,
    pointerEvents: "none",
    mixBlendMode: "overlay",
  };

  return <div style={gradientStyle} />;
};

export const TileFloor: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames, fps } = useVideoConfig();

  const tileWidth = width / COLS;
  const tileHeight = height / ROWS;

  // Final fade-out: starts at frame 150 (hold until frame 150 of 180), fades over 30 frames
  const FADEOUT_START = 150;
  const masterOpacity = interpolate(
    frame,
    [FADEOUT_START, durationInFrames - 1],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill style={{ background: "#0a0a0a" }}>
      <div style={{ opacity: masterOpacity, position: "relative", width, height }}>
        {/* Tile grid */}
        {Array.from({ length: ROWS }, (_, row) =>
          Array.from({ length: COLS }, (_, col) => (
            <Tile
              key={`${col}-${row}`}
              col={col}
              row={row}
              tileWidth={tileWidth}
              tileHeight={tileHeight}
            />
          ))
        )}

        {/* Gloss shimmer sweep after tiles land */}
        <GlossShimmer />
      </div>
    </AbsoluteFill>
  );
};
