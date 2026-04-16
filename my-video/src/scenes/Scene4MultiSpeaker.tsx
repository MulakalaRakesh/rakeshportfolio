import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { SpeakerTrack } from "../components/SpeakerTrack";
import { GlowText } from "../components/GlowText";
import { Waveform } from "../components/Waveform";

const speakers = [
  {
    label: "Speaker 01",
    color: "#00e5ff",
    delay: 10,
    words: ["Welcome", "to", "the", "show"],
  },
  {
    label: "Speaker 02",
    color: "#a855f7",
    delay: 40,
    words: ["Today", "we", "talk"],
  },
  {
    label: "Speaker 03",
    color: "#f59e0b",
    delay: 70,
    words: ["Exactly,", "and"],
  },
  {
    label: "Speaker 04",
    color: "#10b981",
    delay: 100,
    words: ["Right!"],
  },
];

export const Scene4MultiSpeaker: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const trackX = interpolate(frame, [0, 240], [0, -30], {
    extrapolateRight: "clamp",
  });

  const headerScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const labelOpacity = interpolate(frame, [140, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#04030f",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(168,85,247,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Header */}
      <div
        style={{
          transform: `scale(${headerScale}) translateY(${interpolate(headerScale, [0, 1], [-20, 0])}px)`,
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        <GlowText
          fontSize={28}
          fontWeight={900}
          color="#a855f7"
          glowColor="#a855f7"
          letterSpacing="0.2em"
        >
          Multi-Speaker Detection
        </GlowText>
        <div
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: 13,
            letterSpacing: "0.2em",
            fontFamily: "monospace",
            marginTop: 8,
          }}
        >
          VIIBEVOICE — SPEAKER DIARIZATION ENGINE
        </div>
      </div>

      {/* Speaker tracks */}
      <div
        style={{
          width: 760,
          transform: `translateX(${trackX}px)`,
        }}
      >
        {speakers.map((s, i) => (
          <SpeakerTrack
            key={i}
            label={s.label}
            color={s.color}
            delay={s.delay}
            wordsPerLine={s.words}
          />
        ))}
      </div>

      {/* Bottom label */}
      <div
        style={{
          opacity: labelOpacity,
          marginTop: 36,
          transform: `translateY(${interpolate(labelOpacity, [0, 1], [16, 0])}px)`,
        }}
      >
        <GlowText
          fontSize={22}
          fontWeight={900}
          color="#ffffff"
          glowColor="#a855f7"
          letterSpacing="0.12em"
        >
          IT KNOWS WHO'S TALKING
        </GlowText>
      </div>

      {/* Mini waveform */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          opacity: 0.25,
        }}
      >
        <Waveform bars={48} color="#a855f7" height={50} width={900} speed={1.2} />
      </div>
    </div>
  );
};
