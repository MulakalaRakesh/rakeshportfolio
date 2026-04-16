import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { GlowText } from "../components/GlowText";
import { Particles } from "../components/Particles";
import { Waveform } from "../components/Waveform";

export const Scene8CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoReveal = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 100, mass: 1 },
  });

  const ctaReveal = spring({
    frame: frame - 40,
    fps,
    config: { damping: 16, stiffness: 80, mass: 1 },
  });

  const pullBack = interpolate(frame, [0, 300], [1.05, 1], {
    extrapolateRight: "clamp",
  });

  const bloomOpacity = 0.08 + Math.sin(frame * 0.08) * 0.04;
  const pulseScale = 1 + Math.sin(frame * 0.12) * 0.03;

  const linkOpacity = interpolate(frame, [100, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(160deg, #020208 0%, #030310 50%, #010107 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        transform: `scale(${pullBack})`,
      }}
    >
      {/* Particles */}
      <Particles count={35} color="#00e5ff" width={1280} height={720} />

      {/* Ambient bloom */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(0,229,255,${bloomOpacity}) 0%, transparent 70%)`,
          transform: `scale(${pulseScale})`,
        }}
      />

      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoReveal}) translateY(${interpolate(logoReveal, [0, 1], [-20, 0])}px)`,
          opacity: logoReveal,
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        {/* Logo icon */}
        <div style={{ position: "relative" }}>
          <svg width={52} height={52} viewBox="0 0 52 52">
            <defs>
              <filter id="logoGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <circle
              cx={26}
              cy={26}
              r={24}
              fill="none"
              stroke="#00e5ff"
              strokeWidth={2}
              filter="url(#logoGlow)"
              opacity={0.8}
            />
            {/* Waveform bars inside circle */}
            {[8, 14, 20, 26, 32, 38, 44].map((x, i) => {
              const h = [14, 22, 32, 36, 30, 20, 12][i];
              return (
                <rect
                  key={i}
                  x={x - 2}
                  y={26 - h / 2}
                  width={4}
                  height={h}
                  rx={2}
                  fill="#00e5ff"
                  filter="url(#logoGlow)"
                  opacity={0.9}
                />
              );
            })}
          </svg>
        </div>

        <div>
          <div
            style={{
              fontSize: 42,
              fontWeight: 900,
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              color: "#ffffff",
              letterSpacing: "0.04em",
              textShadow:
                "0 0 30px rgba(0,229,255,0.5), 0 0 80px rgba(0,229,255,0.2)",
              lineHeight: 1,
            }}
          >
            VibeVoice
          </div>
          <div
            style={{
              fontSize: 12,
              fontFamily: "monospace",
              color: "#00e5ff",
              letterSpacing: "0.4em",
              opacity: 0.7,
            }}
          >
            AI TRANSCRIPTION
          </div>
        </div>
      </div>

      {/* Waveform decoration */}
      <div
        style={{
          opacity: interpolate(logoReveal, [0, 1], [0, 0.5]),
          marginBottom: 36,
        }}
      >
        <Waveform bars={40} color="#00e5ff" height={40} width={500} speed={0.8} />
      </div>

      {/* CTA Button */}
      <div
        style={{
          transform: `scale(${ctaReveal}) translateY(${interpolate(ctaReveal, [0, 1], [20, 0])}px)`,
          opacity: ctaReveal,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,100,255,0.1))",
            border: "2px solid rgba(0,229,255,0.6)",
            borderRadius: 8,
            padding: "18px 60px",
            display: "inline-block",
            boxShadow: `0 0 30px rgba(0,229,255,${0.2 + Math.sin(frame * 0.1) * 0.1}), 0 0 60px rgba(0,229,255,0.1)`,
            transform: `scale(${pulseScale})`,
          }}
        >
          <GlowText
            fontSize={22}
            fontWeight={900}
            color="#ffffff"
            glowColor="#00e5ff"
            letterSpacing="0.18em"
          >
            TRY VIIBEVOICE FREE
          </GlowText>
        </div>
      </div>

      {/* Link in bio */}
      <div
        style={{
          marginTop: 24,
          opacity: linkOpacity,
          transform: `translateY(${interpolate(linkOpacity, [0, 1], [12, 0])}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 16,
            fontFamily: "monospace",
            letterSpacing: "0.2em",
          }}
        >
          Link in bio ↓
        </div>
      </div>

      {/* Corner UI elements */}
      {[
        { top: 20, left: 20 },
        { top: 20, right: 20 },
        { bottom: 20, left: 20 },
        { bottom: 20, right: 20 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...pos,
            width: 30,
            height: 30,
            borderTop: i < 2 ? "1px solid rgba(0,229,255,0.3)" : "none",
            borderBottom: i >= 2 ? "1px solid rgba(0,229,255,0.3)" : "none",
            borderLeft: i % 2 === 0 ? "1px solid rgba(0,229,255,0.3)" : "none",
            borderRight: i % 2 === 1 ? "1px solid rgba(0,229,255,0.3)" : "none",
            opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" }),
          }}
        />
      ))}
    </div>
  );
};
