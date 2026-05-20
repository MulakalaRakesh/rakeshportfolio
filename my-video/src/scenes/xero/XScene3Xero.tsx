import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const features = [
  { icon: "⇄", label: "Connects to your bank", sub: "Automatic sync", color: "#00b98c" },
  { icon: "◈", label: "Categorises every transaction", sub: "Automatically", color: "#00b98c" },
  { icon: "◻", label: "Sends invoices", sub: "Chases late payments. Automatically.", color: "#00b98c" },
  { icon: "⊞", label: "VAT return", sub: "Calculated, ready, one click to HMRC", color: "#00b98c" },
];

export const XScene3Xero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerIn = spring({ frame, fps, config: { damping: 18, stiffness: 80 } });

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#040407",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "0 80px",
      position: "relative", overflow: "hidden",
    }}>
      {/* BG grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,185,140,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,185,140,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }} />

      {/* Logo area */}
      <div style={{
        opacity: headerIn,
        transform: `scale(${interpolate(headerIn, [0, 1], [0.9, 1])})`,
        marginBottom: 48,
        textAlign: "center",
      }}>
        <div style={{
          fontSize: 13,
          letterSpacing: "0.35em",
          color: "#00b98c",
          fontFamily: "monospace",
          fontWeight: 700,
          marginBottom: 10,
          textTransform: "uppercase",
        }}>
          Xero
        </div>
        <div style={{
          fontSize: 38,
          fontWeight: 900,
          color: "#ffffff",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          letterSpacing: "-0.02em",
        }}>
          Connects to your bank.
        </div>
        <div style={{
          fontSize: 22,
          fontWeight: 400,
          color: "#ffffff66",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          marginTop: 8,
        }}>
          And then it does everything else.
        </div>
      </div>

      {/* Feature cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, width: 700 }}>
        {features.map((f, i) => {
          const cardIn = spring({
            frame: frame - 20 - i * 18,
            fps,
            config: { damping: 16, stiffness: 100 },
          });
          return (
            <div key={i} style={{
              opacity: cardIn,
              transform: `translateX(${interpolate(cardIn, [0, 1], [50, 0])}px)`,
              display: "flex", alignItems: "center", gap: 20,
              background: "rgba(0,185,140,0.05)",
              border: "1px solid rgba(0,185,140,0.2)",
              borderRadius: 10,
              padding: "16px 24px",
            }}>
              <div style={{
                fontSize: 22,
                color: f.color,
                width: 36, textAlign: "center",
                flexShrink: 0,
                textShadow: `0 0 16px ${f.color}88`,
              }}>
                {f.icon}
              </div>
              <div>
                <div style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#ffffff",
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                }}>
                  {f.label}
                </div>
                <div style={{
                  fontSize: 14,
                  color: "#00b98c",
                  fontFamily: "monospace",
                  marginTop: 3,
                  letterSpacing: "0.05em",
                }}>
                  {f.sub}
                </div>
              </div>
              {/* Check mark */}
              <div style={{
                marginLeft: "auto",
                width: 24, height: 24,
                borderRadius: "50%",
                background: "rgba(0,185,140,0.15)",
                border: "1px solid rgba(0,185,140,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, color: "#00b98c",
              }}>
                ✓
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
