import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { Waveform } from "../components/Waveform";
import { GlowText } from "../components/GlowText";

export const Scene2Proof: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0–150 frames (5 sec)
  const slideIn = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 120, mass: 1 },
  });

  const timerProgress = interpolate(frame, [0, 100], [0, 5400], {
    extrapolateRight: "clamp",
  });

  const minutes = Math.floor(timerProgress / 60);
  const seconds = Math.floor(timerProgress % 60);
  const timerStr = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const isFlash = frame > 100 && frame < 120;
  const flashOpacity = interpolate(frame, [100, 110, 120], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const label2Opacity = interpolate(frame, [120, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pushIn = interpolate(frame, [0, 150], [1, 1.04], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#050510",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        transform: `scale(${pushIn})`,
      }}
    >
      {/* Flash overlay */}
      {isFlash && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "white",
            opacity: flashOpacity,
            zIndex: 10,
          }}
        />
      )}

      {/* Grid lines */}
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: `${(i / 8) * 100}%`,
            height: 1,
            background: "rgba(0,229,255,0.06)",
          }}
        />
      ))}

      <div
        style={{
          transform: `translateY(${interpolate(slideIn, [0, 1], [40, 0])}px)`,
          opacity: slideIn,
          textAlign: "center",
        }}
      >
        {/* Label */}
        <div
          style={{
            color: "#00e5ff99",
            fontSize: 13,
            letterSpacing: "0.3em",
            fontFamily: "monospace",
            fontWeight: 700,
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Session Duration
        </div>

        {/* Timer */}
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            color: frame > 100 ? "#ff4444" : "#ffffff",
            letterSpacing: "-0.02em",
            textShadow:
              frame > 100
                ? "0 0 40px rgba(255,68,68,0.6), 0 0 80px rgba(255,68,68,0.3)"
                : "0 0 40px rgba(255,255,255,0.2)",
            lineHeight: 1,
            transition: "color 0.2s, text-shadow 0.2s",
          }}
        >
          {timerStr}
        </div>

        {/* Bottom labels */}
        <div style={{ marginTop: 40, display: "flex", gap: 60, justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <GlowText fontSize={22} fontWeight={900} glowColor="#ffffff" color="#ffffff">
              90 MIN PODCAST
            </GlowText>
          </div>

          <div
            style={{
              width: 1,
              background: "rgba(255,255,255,0.2)",
              alignSelf: "stretch",
            }}
          />

          <div
            style={{
              textAlign: "center",
              opacity: label2Opacity,
              transform: `translateY(${interpolate(label2Opacity, [0, 1], [12, 0])}px)`,
            }}
          >
            <GlowText fontSize={22} fontWeight={900} glowColor="#00e5ff" color="#00e5ff">
              0 SECONDS RECORDED
            </GlowText>
          </div>
        </div>
      </div>

      {/* Waveform at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          opacity: 0.3,
        }}
      >
        <Waveform bars={64} color="#00e5ff" height={60} width={1000} speed={1.5} />
      </div>
    </div>
  );
};
