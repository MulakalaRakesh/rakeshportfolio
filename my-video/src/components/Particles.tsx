import React from "react";
import { useCurrentFrame } from "remotion";

interface ParticlesProps {
  count?: number;
  color?: string;
  width?: number;
  height?: number;
}

const seededRandom = (seed: number) => {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
};

export const Particles: React.FC<ParticlesProps> = ({
  count = 40,
  color = "#00e5ff",
  width = 1280,
  height = 720,
}) => {
  const frame = useCurrentFrame();

  return (
    <svg
      width={width}
      height={height}
      style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
    >
      {Array.from({ length: count }, (_, i) => {
        const baseX = seededRandom(i * 3.1) * width;
        const baseY = seededRandom(i * 7.3) * height;
        const speed = seededRandom(i * 2.7) * 0.5 + 0.2;
        const size = seededRandom(i * 5.1) * 3 + 1;
        const opacity = seededRandom(i * 4.3) * 0.5 + 0.1;
        const drift = Math.sin(frame * speed * 0.04 + i) * 30;
        const rise = ((frame * speed * 0.8) % height);
        const y = (baseY - rise + height) % height;

        return (
          <circle
            key={i}
            cx={baseX + drift}
            cy={y}
            r={size}
            fill={color}
            opacity={opacity}
          />
        );
      })}
    </svg>
  );
};
