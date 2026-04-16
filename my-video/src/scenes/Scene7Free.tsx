import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { GlowText } from "../components/GlowText";
import { Particles } from "../components/Particles";

const lines = ["NO SUBSCRIPTION.", "NO LIMITS.", "NO EXCUSES."];

export const Scene7Free: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const freeScale = spring({
    frame,
    fps,
    config: { damping: 8, stiffness: 250, mass: 0.6 },
  });

  const freeOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const flashOpacity = interpolate(frame, [0, 6, 15], [1, 0.6, 0], {
    extrapolateRight: "clamp",
  });

  const logoOpacity = interpolate(frame, [50, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#000000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Flash */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "white",
          opacity: flashOpacity,
          zIndex: 20,
        }}
      />

      {/* Particles */}
      <Particles count={50} color="#00e5ff" width={1280} height={720} />

      {/* Radial burst */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,229,255,0.12) 0%, rgba(0,0,0,0) 65%)",
          transform: `scale(${freeScale})`,
          opacity: freeOpacity,
        }}
      />

      {/* FREE text */}
      <div
        style={{
          transform: `scale(${freeScale})`,
          opacity: freeOpacity,
          marginBottom: 30,
        }}
      >
        <div
          style={{
            fontSize: 200,
            fontWeight: 900,
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            color: "#ffffff",
            letterSpacing: "-0.03em",
            textShadow:
              "0 0 40px rgba(0,229,255,0.6), 0 0 100px rgba(0,229,255,0.3), 0 0 200px rgba(0,229,255,0.15)",
            lineHeight: 0.9,
            userSelect: "none",
          }}
        >
          FREE
        </div>
      </div>

      {/* Sub-lines — staggered */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: logoOpacity,
          transform: `translateY(${interpolate(logoOpacity, [0, 1], [20, 0])}px)`,
        }}
      >
        {lines.map((line, i) => {
          const lineOpacity = interpolate(
            frame,
            [55 + i * 18, 85 + i * 18],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <div
              key={i}
              style={{
                opacity: lineOpacity,
                transform: `translateY(${interpolate(lineOpacity, [0, 1], [10, 0])}px)`,
              }}
            >
              <GlowText
                fontSize={26}
                fontWeight={900}
                color="#ffffff"
                glowColor="#00e5ff"
                letterSpacing="0.25em"
              >
                {line}
              </GlowText>
            </div>
          );
        })}
      </div>

      {/* VibeVoice brand at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          opacity: interpolate(frame, [120, 180], [0, 0.6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          style={{
            color: "#00e5ff",
            fontSize: 14,
            letterSpacing: "0.4em",
            fontFamily: "monospace",
            fontWeight: 700,
          }}
        >
          VIIBEVOICE.AI
        </div>
      </div>
    </div>
  );
};
