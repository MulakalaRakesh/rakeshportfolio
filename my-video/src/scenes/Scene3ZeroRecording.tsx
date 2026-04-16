import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { GlowText } from "../components/GlowText";

const transcriptLines = [
  "Hey everyone, welcome back to the show...",
  "Today we're diving into AI transcription...",
  "This is going to blow your mind completely...",
  "No recording needed whatsoever...",
  "VibeVoice just handles everything...",
  "Multiple speakers, detected instantly...",
];

export const Scene3ZeroRecording: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const micScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100, mass: 1 },
  });

  const panY = interpolate(frame, [0, 180], [0, -20], {
    extrapolateRight: "clamp",
  });

  const linesVisible = Math.floor(interpolate(frame, [30, 160], [0, 6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }));

  const label1Opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const label2Opacity = interpolate(frame, [80, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cursorBlink = frame % 30 < 15 ? 1 : 0;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#030309",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        transform: `translateY(${panY}px)`,
      }}
    >
      {/* Left: Mic + label */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          opacity: label1Opacity,
        }}
      >
        {/* Mic SVG */}
        <div
          style={{
            transform: `scale(${micScale})`,
            position: "relative",
          }}
        >
          <svg width={120} height={160} viewBox="0 0 120 160">
            <defs>
              <filter id="micglow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Mic body */}
            <rect
              x={40}
              y={10}
              width={40}
              height={70}
              rx={20}
              fill="none"
              stroke="#ffffff44"
              strokeWidth={3}
              filter="url(#micglow)"
            />
            {/* Mic stand */}
            <path
              d="M 20 80 Q 20 120 60 120 Q 100 120 100 80"
              fill="none"
              stroke="#ffffff33"
              strokeWidth={3}
            />
            <line
              x1={60}
              y1={120}
              x2={60}
              y2={150}
              stroke="#ffffff33"
              strokeWidth={3}
            />
            <line
              x1={35}
              y1={150}
              x2={85}
              y2={150}
              stroke="#ffffff33"
              strokeWidth={3}
            />
            {/* X mark */}
            <line x1={45} y1={40} x2={75} y2={70} stroke="#ff4444" strokeWidth={4} />
            <line x1={75} y1={40} x2={45} y2={70} stroke="#ff4444" strokeWidth={4} />
          </svg>
        </div>

        <GlowText
          fontSize={18}
          fontWeight={700}
          color="#ff4444"
          glowColor="#ff4444"
          letterSpacing="0.2em"
        >
          NO MIC NEEDED
        </GlowText>
      </div>

      {/* Divider */}
      <div
        style={{
          width: 1,
          height: 400,
          background: "linear-gradient(to bottom, transparent, #00e5ff44, transparent)",
        }}
      />

      {/* Right: Transcript panel */}
      <div
        style={{
          flex: 1.4,
          padding: "0 50px",
          opacity: label2Opacity,
        }}
      >
        <div
          style={{
            background: "rgba(0,229,255,0.04)",
            border: "1px solid rgba(0,229,255,0.2)",
            borderRadius: 12,
            padding: "24px 28px",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Header bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
              borderBottom: "1px solid rgba(0,229,255,0.15)",
              paddingBottom: 14,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#00e5ff",
                boxShadow: "0 0 10px #00e5ff",
              }}
            />
            <span
              style={{
                color: "#00e5ff",
                fontSize: 12,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: "0.2em",
              }}
            >
              VIIBEVOICE — LIVE TRANSCRIPT
            </span>
          </div>

          {/* Lines */}
          {transcriptLines.slice(0, linesVisible).map((line, i) => (
            <div
              key={i}
              style={{
                color: "#ffffffcc",
                fontSize: 14,
                fontFamily: "monospace",
                lineHeight: 1.8,
                paddingLeft: 12,
                borderLeft: "2px solid rgba(0,229,255,0.3)",
                marginBottom: 6,
              }}
            >
              {line}
              {i === linesVisible - 1 && (
                <span
                  style={{
                    display: "inline-block",
                    width: 8,
                    height: 14,
                    background: "#00e5ff",
                    marginLeft: 2,
                    opacity: cursorBlink,
                    verticalAlign: "middle",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20, textAlign: "center" }}>
          <GlowText
            fontSize={20}
            fontWeight={900}
            color="#00e5ff"
            glowColor="#00e5ff"
            letterSpacing="0.15em"
          >
            ALREADY TRANSCRIBED
          </GlowText>
        </div>
      </div>
    </div>
  );
};
