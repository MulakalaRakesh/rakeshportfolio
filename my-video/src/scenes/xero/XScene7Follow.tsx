import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const XScene7Follow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoIn = spring({ frame, fps, config: { damping: 16, stiffness: 90 } });
  const ctaIn = spring({ frame: frame - 30, fps, config: { damping: 14, stiffness: 100 } });
  const subIn = spring({ frame: frame - 60, fps, config: { damping: 18, stiffness: 80 } });

  const glowPulse = 0.12 + Math.sin(frame * 0.1) * 0.05;
  const btnPulse = 1 + Math.sin(frame * 0.12) * 0.02;

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "linear-gradient(160deg, #030307 0%, #050510 50%, #030307 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
    }}>
      {/* Ambient bloom */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 50% 50%, rgba(0,185,140,${glowPulse}) 0%, transparent 55%)`,
      }} />

      {/* Corner brackets */}
      {[
        { top: 24, left: 24, borderTop: "1px solid rgba(0,185,140,0.3)", borderLeft: "1px solid rgba(0,185,140,0.3)" },
        { top: 24, right: 24, borderTop: "1px solid rgba(0,185,140,0.3)", borderRight: "1px solid rgba(0,185,140,0.3)" },
        { bottom: 24, left: 24, borderBottom: "1px solid rgba(0,185,140,0.3)", borderLeft: "1px solid rgba(0,185,140,0.3)" },
        { bottom: 24, right: 24, borderBottom: "1px solid rgba(0,185,140,0.3)", borderRight: "1px solid rgba(0,185,140,0.3)" },
      ].map((s, i) => (
        <div key={i} style={{
          position: "absolute", width: 32, height: 32,
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
          ...s,
        }} />
      ))}

      {/* Xero wordmark */}
      <div style={{
        opacity: logoIn,
        transform: `scale(${interpolate(logoIn, [0, 1], [0.85, 1])})`,
        marginBottom: 8,
        textAlign: "center",
      }}>
        <div style={{
          fontSize: 56, fontWeight: 900,
          color: "#ffffff",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          letterSpacing: "-0.02em",
          textShadow: "0 0 40px rgba(0,185,140,0.4), 0 0 80px rgba(0,185,140,0.15)",
        }}>
          Xero
        </div>
        <div style={{
          fontSize: 12, letterSpacing: "0.4em",
          color: "#00b98c", fontFamily: "monospace",
          fontWeight: 700, textTransform: "uppercase",
          marginTop: 4, opacity: 0.8,
        }}>
          Beautiful business
        </div>
      </div>

      {/* Divider */}
      <div style={{
        width: interpolate(logoIn, [0, 1], [0, 300]),
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(0,185,140,0.5), transparent)",
        marginBottom: 36,
      }} />

      {/* CTA */}
      <div style={{
        opacity: ctaIn,
        transform: `scale(${interpolate(ctaIn, [0, 1], [0.95, 1])} ) scale(${btnPulse})`,
      }}>
        <div style={{
          background: "linear-gradient(135deg, rgba(0,185,140,0.15), rgba(0,185,140,0.08))",
          border: "2px solid rgba(0,185,140,0.5)",
          borderRadius: 8,
          padding: "18px 70px",
          textAlign: "center",
          boxShadow: `0 0 40px rgba(0,185,140,${glowPulse * 1.5}), 0 0 80px rgba(0,185,140,0.08)`,
        }}>
          <div style={{
            fontSize: 22, fontWeight: 900,
            color: "#ffffff", letterSpacing: "0.12em",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            textTransform: "uppercase",
          }}>
            Follow for Part 2 →
          </div>
        </div>
      </div>

      {/* Sub note */}
      <div style={{
        opacity: subIn,
        transform: `translateY(${interpolate(subIn, [0, 1], [12, 0])}px)`,
        marginTop: 24, textAlign: "center",
      }}>
        <div style={{
          fontSize: 14,
          color: "rgba(255,255,255,0.35)",
          fontFamily: "monospace",
          letterSpacing: "0.15em",
        }}>
          Part 4 is the one that changes everything.
        </div>
      </div>
    </div>
  );
};
