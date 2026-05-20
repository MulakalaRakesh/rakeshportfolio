import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const XScene4Stripe: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerIn = spring({ frame, fps, config: { damping: 18, stiffness: 80 } });
  const invoiceIn = spring({ frame: frame - 20, fps, config: { damping: 16, stiffness: 90 } });
  const btnIn = spring({ frame: frame - 50, fps, config: { damping: 14, stiffness: 120 } });
  const lineIn = spring({ frame: frame - 90, fps, config: { damping: 18, stiffness: 80 } });

  const timerCount = Math.min(30, Math.floor(interpolate(frame, [100, 160], [0, 30], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  })));

  const pulsate = 1 + Math.sin(frame * 0.15) * 0.02;

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#03030a",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 40%, rgba(99,91,255,0.08) 0%, transparent 60%)",
      }} />

      {/* Header */}
      <div style={{
        opacity: headerIn,
        transform: `translateY(${interpolate(headerIn, [0, 1], [-20, 0])}px)`,
        textAlign: "center", marginBottom: 40,
      }}>
        <div style={{
          fontSize: 13, letterSpacing: "0.3em",
          color: "#635bff", fontFamily: "monospace",
          fontWeight: 700, textTransform: "uppercase", marginBottom: 10,
        }}>
          Xero + Stripe
        </div>
        <div style={{
          fontSize: 36, fontWeight: 900,
          color: "#ffffff",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          letterSpacing: "-0.02em",
        }}>
          Pair it with Stripe.
        </div>
      </div>

      {/* Fake invoice */}
      <div style={{
        opacity: invoiceIn,
        transform: `scale(${interpolate(invoiceIn, [0, 1], [0.95, 1])})`,
        width: 500,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 12,
        padding: "24px 28px",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between",
          marginBottom: 20, paddingBottom: 16,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}>
          <div>
            <div style={{ fontSize: 11, color: "#ffffff44", fontFamily: "monospace", letterSpacing: "0.2em" }}>INVOICE #0042</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#ffffff", marginTop: 4 }}>£ 2,400.00</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "#ffffff44", fontFamily: "monospace" }}>DUE DATE</div>
            <div style={{ fontSize: 14, color: "#ffffff88", marginTop: 4 }}>30 days</div>
          </div>
        </div>

        {/* Pay now button */}
        <div style={{
          opacity: btnIn,
          transform: `scale(${interpolate(btnIn, [0, 1], [0.9, 1])} ) scale(${pulsate})`,
          background: "linear-gradient(135deg, #635bff, #4f46e5)",
          borderRadius: 8, padding: "14px 0",
          textAlign: "center", cursor: "pointer",
          boxShadow: `0 0 30px rgba(99,91,255,${0.3 + Math.sin(frame * 0.1) * 0.1})`,
        }}>
          <div style={{
            fontSize: 16, fontWeight: 700,
            color: "#ffffff", letterSpacing: "0.05em",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
          }}>
            Pay now →
          </div>
        </div>

        <div style={{
          opacity: btnIn,
          marginTop: 12, fontSize: 12,
          color: "#635bff",
          fontFamily: "monospace",
          textAlign: "center",
          letterSpacing: "0.1em",
        }}>
          Powered by Stripe
        </div>
      </div>

      {/* Timer line */}
      <div style={{
        opacity: lineIn,
        transform: `translateY(${interpolate(lineIn, [0, 1], [20, 0])}px)`,
        marginTop: 36, textAlign: "center",
      }}>
        <div style={{
          fontSize: 48, fontWeight: 900,
          color: "#ffffff",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          letterSpacing: "-0.03em",
        }}>
          {timerCount}s
        </div>
        <div style={{
          fontSize: 16, color: "#ffffff55",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          marginTop: 6, letterSpacing: "0.05em",
        }}>
          Client pays. It reconciles itself.
        </div>
      </div>
    </div>
  );
};
