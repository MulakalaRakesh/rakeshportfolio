import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { GlowText } from "../components/GlowText";

export const Scene5Comparison: React.FC = () => {
  const frame = useCurrentFrame();
  useVideoConfig();

  const zoomOut = interpolate(frame, [0, 240], [1.08, 1], {
    extrapolateRight: "clamp",
  });

  const bassDrop = interpolate(frame, [140, 160], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const leftOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rightOpacity = interpolate(frame, [60, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bufferingDots = Math.floor(frame / 20) % 4;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#020202",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        transform: `scale(${zoomOut})`,
      }}
    >
      {/* Left — Competitor (bad) */}
      <div
        style={{
          flex: 1,
          background: "#0d0000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
          borderRight: "1px solid rgba(255,68,68,0.3)",
          opacity: leftOpacity,
          position: "relative",
        }}
      >
        {/* Red tint overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,0,0,0.04)",
          }}
        />

        <div
          style={{
            color: "#ff4444",
            fontSize: 13,
            letterSpacing: "0.25em",
            fontFamily: "monospace",
            marginBottom: 30,
            opacity: 0.7,
          }}
        >
          OTHER TOOLS
        </div>

        {/* Fake broken UI */}
        <div
          style={{
            width: 340,
            background: "rgba(255,0,0,0.06)",
            border: "1px solid rgba(255,68,68,0.3)",
            borderRadius: 8,
            padding: 20,
          }}
        >
          {/* Loading bar stuck */}
          <div
            style={{
              height: 6,
              background: "#1a0000",
              borderRadius: 3,
              marginBottom: 16,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: "37%",
                background: "#ff4444",
                borderRadius: 3,
              }}
            />
          </div>

          <div
            style={{
              color: "#ff6666",
              fontSize: 14,
              fontFamily: "monospace",
              marginBottom: 10,
            }}
          >
            Buffering{".".repeat(bufferingDots)}
          </div>

          {["Error: Upload limit exceeded", "Timeout: Please retry", "Plan required"].map(
            (err, i) => (
              <div
                key={i}
                style={{
                  color: "#ff444488",
                  fontSize: 12,
                  fontFamily: "monospace",
                  marginBottom: 6,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ color: "#ff4444" }}>✕</span>
                {err}
              </div>
            )
          )}
        </div>

        <div style={{ marginTop: 30 }}>
          <GlowText
            fontSize={18}
            fontWeight={900}
            color="#ff4444"
            glowColor="#ff4444"
            letterSpacing="0.18em"
          >
            STILL STRUGGLING
          </GlowText>
        </div>
      </div>

      {/* Right — VibeVoice (good) */}
      <div
        style={{
          flex: 1,
          background: "#00050d",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
          opacity: rightOpacity,
          position: "relative",
        }}
      >
        {/* Blue tint overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,229,255,0.02)",
          }}
        />

        <div
          style={{
            color: "#00e5ff",
            fontSize: 13,
            letterSpacing: "0.25em",
            fontFamily: "monospace",
            marginBottom: 30,
            opacity: 0.7,
          }}
        >
          VIIBEVOICE
        </div>

        {/* Clean UI */}
        <div
          style={{
            width: 340,
            background: "rgba(0,229,255,0.04)",
            border: "1px solid rgba(0,229,255,0.25)",
            borderRadius: 8,
            padding: 20,
          }}
        >
          {/* Full loading bar */}
          <div
            style={{
              height: 6,
              background: "#001a1a",
              borderRadius: 3,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${Math.min(100, interpolate(frame, [60, 180], [0, 100], { extrapolateRight: "clamp" }))}%`,
                background: "linear-gradient(90deg, #00e5ff, #0066ff)",
                borderRadius: 3,
                boxShadow: "0 0 10px rgba(0,229,255,0.4)",
              }}
            />
          </div>

          <div
            style={{
              color: "#00e5ff",
              fontSize: 14,
              fontFamily: "monospace",
              marginBottom: 10,
            }}
          >
            Complete ✓
          </div>

          {["90-min transcript ready", "4 speakers identified", "100% accuracy"].map(
            (item, i) => (
              <div
                key={i}
                style={{
                  color: "#00e5ffaa",
                  fontSize: 12,
                  fontFamily: "monospace",
                  marginBottom: 6,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  opacity: interpolate(frame, [80 + i * 20, 100 + i * 20], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                <span style={{ color: "#00e5ff" }}>✓</span>
                {item}
              </div>
            )
          )}
        </div>

        <div style={{ marginTop: 30 }}>
          <GlowText
            fontSize={18}
            fontWeight={900}
            color="#00e5ff"
            glowColor="#00e5ff"
            letterSpacing="0.18em"
          >
            ALREADY DONE
          </GlowText>
        </div>
      </div>

      {/* Center bass drop flash */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 4,
          height: "100%",
          background: `rgba(0,229,255,${bassDrop * 0.8})`,
          boxShadow: `0 0 30px rgba(0,229,255,${bassDrop})`,
        }}
      />
    </div>
  );
};
