import { useCurrentFrame } from "remotion";
import React from "react";

interface WaveformProps {
  bars?: number;
  color?: string;
  height?: number;
  width?: number;
  speed?: number;
  glowColor?: string;
}

export const Waveform: React.FC<WaveformProps> = ({
  bars = 32,
  color = "#00e5ff",
  height = 120,
  width = 600,
  speed = 1,
  glowColor = "#00e5ff",
}) => {
  const frame = useCurrentFrame();

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {Array.from({ length: bars }, (_, i) => {
        const x = (i / bars) * width + width / bars / 2;
        const phase = (i / bars) * Math.PI * 4 + frame * 0.15 * speed;
        const barHeight =
          (Math.sin(phase) * 0.4 +
            Math.sin(phase * 1.7 + 1.2) * 0.3 +
            Math.sin(phase * 0.5 + 2.1) * 0.3) *
            0.5 *
            height +
          height * 0.08;
        const bh = Math.max(4, Math.abs(barHeight));

        return (
          <rect
            key={i}
            x={x - 3}
            y={height / 2 - bh / 2}
            width={6}
            height={bh}
            rx={3}
            fill={color}
            filter="url(#glow)"
            opacity={0.85 + Math.sin(phase + i) * 0.15}
          />
        );
      })}
    </svg>
  );
};
