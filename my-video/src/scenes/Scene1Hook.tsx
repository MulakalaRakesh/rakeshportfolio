import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { Waveform } from "../components/Waveform";
import { GlowText } from "../components/GlowText";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 200, mass: 0.5 },
  });

  const textOpacity = interpolate(frame, [8, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const waveScale = interpolate(frame, [0, 30], [0.2, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulseOpacity = interpolate(
    frame % 20,
    [0, 10, 20],
    [0.3, 1, 0.3],
    { extrapolateRight: "clamp" }
  );

  const bgGlow = interpolate(frame, [0, 30, 90], [0, 0.4, 0.15], {
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
      {/* Radial glow burst */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(0,229,255,${bgGlow}) 0%, transparent 70%)`,
          transform: `scale(${scale})`,
        }}
      />

      {/* Waveform */}
      <div
        style={{
          transform: `scaleY(${waveScale})`,
          opacity: 0.6,
          marginBottom: 40,
        }}
      >
        <Waveform bars={48} color="#00e5ff" height={90} width={700} speed={2} />
      </div>

      {/* Main hook text */}
      <div style={{ opacity: textOpacity, textAlign: "center", padding: "0 80px" }}>
        <GlowText
          fontSize={36}
          fontWeight={900}
          glowColor="#00e5ff"
          letterSpacing="0.08em"
        >
          The last transcription tool
        </GlowText>
        <GlowText
          fontSize={36}
          fontWeight={900}
          glowColor="#00e5ff"
          letterSpacing="0.08em"
        >
          you'll ever need
        </GlowText>
        <GlowText
          fontSize={24}
          fontWeight={700}
          color="#00e5ff"
          glowColor="#00e5ff"
          letterSpacing="0.18em"
          style={{ marginTop: 16 }}
        >
          just made every other one obsolete.
        </GlowText>
      </div>

      {/* Pulse ring */}
      <div
        style={{
          position: "absolute",
          width: 300 + frame * 8,
          height: 300 + frame * 8,
          borderRadius: "50%",
          border: `1px solid rgba(0,229,255,${pulseOpacity * 0.2})`,
          opacity: interpolate(frame, [0, 90], [1, 0], { extrapolateRight: "clamp" }),
        }}
      />
    </div>
  );
};
