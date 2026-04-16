import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

interface SpeakerTrackProps {
  label: string;
  color: string;
  delay?: number;
  wordsPerLine?: string[];
}

export const SpeakerTrack: React.FC<SpeakerTrackProps> = ({
  label,
  color,
  delay = 0,
  wordsPerLine = [],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slide = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.8 },
  });

  const opacity = interpolate(frame - delay, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        transform: `translateX(${interpolate(slide, [0, 1], [-60, 0])}px)`,
        opacity,
        marginBottom: 14,
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 12px ${color}, 0 0 24px ${color}88`,
          flexShrink: 0,
        }}
      />
      <div
        style={{
          color,
          fontSize: 14,
          fontWeight: 700,
          fontFamily: "monospace",
          letterSpacing: "0.15em",
          minWidth: 100,
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <div
        style={{
          flex: 1,
          height: 28,
          background: `${color}18`,
          borderRadius: 4,
          border: `1px solid ${color}44`,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: `${(frame % 90) > 10 ? 40 + Math.random() * 40 : 20}%`,
            background: `linear-gradient(90deg, ${color}22, ${color}66)`,
            transition: "width 0.1s",
          }}
        />
        {wordsPerLine.map((word, wi) => (
          <span
            key={wi}
            style={{
              position: "absolute",
              left: 8 + wi * 80,
              top: "50%",
              transform: "translateY(-50%)",
              color: `${color}cc`,
              fontSize: 11,
              fontFamily: "monospace",
            }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};
