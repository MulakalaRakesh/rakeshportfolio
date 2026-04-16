import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { GlowText } from "../components/GlowText";
import { Waveform } from "../components/Waveform";

const keywords = ["AI", "podcast", "transcription", "multi-speaker", "free", "accurate"];

export const Scene6Dashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const reveal = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 80, mass: 1.2 },
  });

  // Orbital/parallax: slight rotation + translate
  const orbX = Math.sin(frame * 0.02) * 12;
  const orbY = Math.cos(frame * 0.015) * 8;

  const labelOpacity = interpolate(frame, [120, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const progressWidth = interpolate(frame, [20, 180], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #040414 0%, #060820 50%, #03030d 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Atmospheric glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: `translate(calc(-50% + ${orbX}px), calc(-50% + ${orbY}px))`,
        }}
      />

      {/* Dashboard panel */}
      <div
        style={{
          width: 860,
          transform: `scale(${reveal}) translateY(${interpolate(reveal, [0, 1], [30, 0])}px) translateX(${orbX * 0.3}px)`,
          opacity: reveal,
        }}
      >
        {/* Dashboard header */}
        <div
          style={{
            background: "rgba(0,229,255,0.06)",
            border: "1px solid rgba(0,229,255,0.2)",
            borderRadius: "12px 12px 0 0",
            padding: "14px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                fontSize: 18,
                fontWeight: 900,
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                color: "#00e5ff",
                letterSpacing: "0.1em",
              }}
            >
              VIIBEVOICE
            </div>
            <div
              style={{
                background: "rgba(0,229,255,0.15)",
                border: "1px solid rgba(0,229,255,0.3)",
                borderRadius: 4,
                padding: "2px 8px",
                fontSize: 10,
                fontFamily: "monospace",
                color: "#00e5ff",
                letterSpacing: "0.15em",
              }}
            >
              LIVE
            </div>
          </div>
          <div
            style={{
              color: "rgba(0,229,255,0.5)",
              fontSize: 12,
              fontFamily: "monospace",
            }}
          >
            Session: 90:00 / 90:00
          </div>
        </div>

        {/* Dashboard body */}
        <div
          style={{
            background: "rgba(0,229,255,0.02)",
            border: "1px solid rgba(0,229,255,0.15)",
            borderTop: "none",
            borderRadius: "0 0 12px 12px",
            padding: 24,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          {/* Stats */}
          {[
            { label: "Words Transcribed", value: "14,832", color: "#00e5ff" },
            { label: "Speakers Detected", value: "4", color: "#a855f7" },
            { label: "Accuracy Rate", value: "98.6%", color: "#10b981" },
            { label: "Processing Time", value: "0.4s", color: "#f59e0b" },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                background: `${stat.color}0a`,
                border: `1px solid ${stat.color}33`,
                borderRadius: 8,
                padding: "16px 20px",
                opacity: interpolate(frame, [20 + i * 20, 50 + i * 20], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <div
                style={{
                  color: `${stat.color}88`,
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  fontFamily: "monospace",
                  marginBottom: 6,
                }}
              >
                {stat.label.toUpperCase()}
              </div>
              <div
                style={{
                  color: stat.color,
                  fontSize: 28,
                  fontWeight: 900,
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  textShadow: `0 0 20px ${stat.color}66`,
                }}
              >
                {stat.value}
              </div>
            </div>
          ))}

          {/* Progress bar (spans 2 cols) */}
          <div
            style={{
              gridColumn: "1 / -1",
              background: "rgba(0,229,255,0.04)",
              border: "1px solid rgba(0,229,255,0.15)",
              borderRadius: 8,
              padding: "14px 18px",
            }}
          >
            <div
              style={{
                color: "rgba(0,229,255,0.6)",
                fontSize: 11,
                fontFamily: "monospace",
                letterSpacing: "0.2em",
                marginBottom: 10,
              }}
            >
              TRANSCRIPT PROGRESS
            </div>
            <div
              style={{
                height: 8,
                background: "rgba(0,229,255,0.1)",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progressWidth}%`,
                  background: "linear-gradient(90deg, #00e5ff, #0066ff)",
                  borderRadius: 4,
                  boxShadow: "0 0 12px rgba(0,229,255,0.5)",
                }}
              />
            </div>

            {/* Keywords */}
            <div
              style={{
                marginTop: 12,
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              {keywords.map((kw, i) => (
                <span
                  key={i}
                  style={{
                    background: "rgba(0,229,255,0.1)",
                    border: "1px solid rgba(0,229,255,0.25)",
                    borderRadius: 4,
                    padding: "2px 10px",
                    fontSize: 11,
                    fontFamily: "monospace",
                    color: "#00e5ffbb",
                    opacity: interpolate(frame, [60 + i * 15, 90 + i * 15], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                  }}
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Waveform */}
      <div
        style={{
          marginTop: 30,
          opacity: 0.4,
          transform: `translateX(${orbX * 0.5}px)`,
        }}
      >
        <Waveform bars={56} color="#00e5ff" height={50} width={860} speed={1} />
      </div>

      {/* Bottom label */}
      <div
        style={{
          marginTop: 20,
          opacity: labelOpacity,
        }}
      >
        <GlowText
          fontSize={20}
          fontWeight={900}
          color="#ffffff"
          glowColor="#00e5ff"
          letterSpacing="0.2em"
        >
          FREE. ACCURATE. INSTANT.
        </GlowText>
      </div>
    </div>
  );
};
