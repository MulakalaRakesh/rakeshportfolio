import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const XScene5Story: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const avatarIn = spring({ frame, fps, config: { damping: 16, stiffness: 80 } });
  const quoteIn = spring({ frame: frame - 25, fps, config: { damping: 18, stiffness: 70 } });
  const statIn = spring({ frame: frame - 80, fps, config: { damping: 18, stiffness: 80 } });

  const glowPulse = 0.15 + Math.sin(frame * 0.07) * 0.05;

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#040407",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "0 140px",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 50% 30%, rgba(0,185,140,${glowPulse}) 0%, transparent 50%)`,
      }} />

      {/* Avatar */}
      <div style={{
        opacity: avatarIn,
        transform: `scale(${interpolate(avatarIn, [0, 1], [0.8, 1])})`,
        marginBottom: 28,
        position: "relative",
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          background: "linear-gradient(135deg, #00b98c33, #00b98c11)",
          border: "2px solid rgba(0,185,140,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28,
          boxShadow: "0 0 30px rgba(0,185,140,0.2)",
        }}>
          👩‍💼
        </div>
        <div style={{
          position: "absolute", bottom: -4, right: -4,
          width: 20, height: 20, borderRadius: "50%",
          background: "#00b98c",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 10,
        }}>
          ✓
        </div>
      </div>

      {/* Quote */}
      <div style={{
        opacity: quoteIn,
        transform: `translateY(${interpolate(quoteIn, [0, 1], [20, 0])}px)`,
        textAlign: "center", maxWidth: 680,
      }}>
        <div style={{
          fontSize: 15,
          color: "#00b98c",
          fontFamily: "monospace",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: 20,
        }}>
          A consultant I know
        </div>
        <div style={{
          fontSize: 38,
          fontWeight: 900,
          color: "#ffffff",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          letterSpacing: "-0.02em",
          lineHeight: 1.25,
        }}>
          Got the last week of her month back.
        </div>
        <div style={{
          fontSize: 22,
          fontWeight: 400,
          color: "#ffffff77",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          marginTop: 16,
          lineHeight: 1.5,
        }}>
          Every month. Forever.
        </div>
      </div>

      {/* Setup stat */}
      <div style={{
        opacity: statIn,
        transform: `translateY(${interpolate(statIn, [0, 1], [20, 0])}px)`,
        marginTop: 40,
        background: "rgba(0,185,140,0.07)",
        border: "1px solid rgba(0,185,140,0.25)",
        borderRadius: 10,
        padding: "16px 40px",
        textAlign: "center",
      }}>
        <div style={{
          fontSize: 32, fontWeight: 900,
          color: "#00b98c",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          textShadow: "0 0 24px rgba(0,185,140,0.5)",
        }}>
          1 weekend of setup.
        </div>
        <div style={{
          fontSize: 14,
          color: "#ffffff55",
          fontFamily: "monospace",
          marginTop: 6,
          letterSpacing: "0.15em",
        }}>
          FROM ONE WEEKEND OF SETUP
        </div>
      </div>
    </div>
  );
};
