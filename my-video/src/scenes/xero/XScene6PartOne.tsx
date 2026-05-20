import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const XScene6PartOne: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeIn = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const text1In = spring({ frame: frame - 20, fps, config: { damping: 18, stiffness: 80 } });
  const text2In = spring({ frame: frame - 50, fps, config: { damping: 18, stiffness: 80 } });

  const segmentOpacity = (i: number) =>
    interpolate(frame, [10 + i * 12, 30 + i * 12], [0.2, 1], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp",
    });

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#040408",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "0 120px",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 60%, rgba(0,185,140,0.06) 0%, transparent 55%)",
      }} />

      {/* Part badge */}
      <div style={{
        opacity: badgeIn,
        transform: `scale(${interpolate(badgeIn, [0, 1], [0.7, 1])})`,
        marginBottom: 36,
        display: "flex", gap: 10,
      }}>
        {[1, 2, 3, 4, 5].map(n => (
          <div key={n} style={{
            width: n === 1 ? 48 : 10,
            height: 10,
            borderRadius: 5,
            background: n === 1 ? "#00b98c" : "rgba(0,185,140,0.25)",
            opacity: segmentOpacity(n - 1),
            boxShadow: n === 1 ? "0 0 12px rgba(0,185,140,0.6)" : "none",
            transition: "width 0.3s",
          }} />
        ))}
      </div>

      {/* Part label */}
      <div style={{
        opacity: badgeIn,
        fontSize: 13, letterSpacing: "0.3em",
        color: "#00b98c", fontFamily: "monospace",
        fontWeight: 700, textTransform: "uppercase",
        marginBottom: 16,
      }}>
        Part one of five
      </div>

      {/* Main text */}
      <div style={{
        opacity: text1In,
        transform: `translateY(${interpolate(text1In, [0, 1], [20, 0])}px)`,
        textAlign: "center",
      }}>
        <div style={{
          fontSize: 44, fontWeight: 900,
          color: "#ffffff",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
        }}>
          This is part one of five.
        </div>
      </div>

      <div style={{
        opacity: text2In,
        transform: `translateY(${interpolate(text2In, [0, 1], [16, 0])}px)`,
        marginTop: 20,
        textAlign: "center",
      }}>
        <div style={{
          fontSize: 22, fontWeight: 400,
          color: "#ffffff66",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          lineHeight: 1.6,
        }}>
          Follow —
        </div>
        <div style={{
          fontSize: 22, fontWeight: 400,
          color: "#ffffff88",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          lineHeight: 1.6,
        }}>
          because part four is the one
        </div>
        <div style={{
          fontSize: 28, fontWeight: 900,
          color: "#00b98c",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          marginTop: 4,
          textShadow: "0 0 24px rgba(0,185,140,0.4)",
        }}>
          that changes everything.
        </div>
      </div>
    </div>
  );
};
