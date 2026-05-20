import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const XScene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1 = spring({ frame: frame - 0, fps, config: { damping: 20, stiffness: 80 } });
  const line2 = spring({ frame: frame - 18, fps, config: { damping: 20, stiffness: 80 } });
  const line3 = spring({ frame: frame - 40, fps, config: { damping: 20, stiffness: 80 } });
  const line4 = spring({ frame: frame - 58, fps, config: { damping: 20, stiffness: 80 } });

  const bgPulse = 0.04 + Math.sin(frame * 0.03) * 0.02;

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#050508",
      display: "flex", flexDirection: "column",
      alignItems: "flex-start", justifyContent: "center",
      padding: "0 120px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Subtle background gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 20% 50%, rgba(0,185,140,${bgPulse}) 0%, transparent 60%)`,
      }} />

      {/* Thin left accent line */}
      <div style={{
        position: "absolute", left: 80, top: "20%", bottom: "20%",
        width: 2,
        background: "linear-gradient(to bottom, transparent, #00b98c, transparent)",
        opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
      }} />

      {[
        { text: "Nobody talks about", size: 28, color: "#ffffff88", spring: line1, weight: 400 },
        { text: "the most expensive hour", size: 48, color: "#ffffff", spring: line2, weight: 900 },
        { text: "in small business.", size: 48, color: "#00b98c", spring: line3, weight: 900 },
        { text: "", size: 0, color: "", spring: line4, weight: 400 },
      ].map((l, i) => l.size > 0 && (
        <div key={i} style={{
          opacity: l.spring,
          transform: `translateY(${interpolate(l.spring, [0, 1], [30, 0])}px)`,
          fontSize: l.size,
          fontWeight: l.weight,
          color: l.color,
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          letterSpacing: "-0.01em",
          lineHeight: 1.2,
          marginBottom: i === 0 ? 8 : 0,
        }}>
          {l.text}
        </div>
      ))}
    </div>
  );
};
