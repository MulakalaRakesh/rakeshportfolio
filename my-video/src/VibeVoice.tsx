import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Proof } from "./scenes/Scene2Proof";
import { Scene3ZeroRecording } from "./scenes/Scene3ZeroRecording";
import { Scene4MultiSpeaker } from "./scenes/Scene4MultiSpeaker";
import { Scene5Comparison } from "./scenes/Scene5Comparison";
import { Scene6Dashboard } from "./scenes/Scene6Dashboard";
import { Scene7Free } from "./scenes/Scene7Free";
import { Scene8CTA } from "./scenes/Scene8CTA";

// 30fps, ~55 seconds total
// Scene timings (in frames):
// Scene 1: 0  – 90   (3 sec)
// Scene 2: 90 – 240  (5 sec)
// Scene 3: 240– 420  (6 sec)
// Scene 4: 420– 660  (8 sec)
// Scene 5: 660– 900  (8 sec)
// Scene 6: 900–1260  (12 sec)
// Scene 7: 1260–1500 (8 sec)
// Scene 8: 1500–1800 (10 sec)

const SCENES = [
  { from: 0,    duration: 90 },   // Hook
  { from: 90,   duration: 150 },  // Proof
  { from: 240,  duration: 180 },  // Zero Recording
  { from: 420,  duration: 240 },  // Multi-speaker
  { from: 660,  duration: 240 },  // Comparison
  { from: 900,  duration: 360 },  // Dashboard
  { from: 1260, duration: 240 },  // Free
  { from: 1500, duration: 300 },  // CTA
];

// Hard cut flash between scenes
const SceneTransition: React.FC<{ from: number }> = ({ from }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [from - 2, from, from + 8], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "white",
        opacity,
        pointerEvents: "none",
        zIndex: 100,
      }}
    />
  );
};

export const VibeVoiceComposition: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000000" }}>
      {/* Scene 1: Hook */}
      <Sequence from={SCENES[0].from} durationInFrames={SCENES[0].duration + 10}>
        <AbsoluteFill>
          <Scene1Hook />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: Proof */}
      <Sequence from={SCENES[1].from} durationInFrames={SCENES[1].duration + 10}>
        <AbsoluteFill>
          <Scene2Proof />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: Zero Recording */}
      <Sequence from={SCENES[2].from} durationInFrames={SCENES[2].duration + 10}>
        <AbsoluteFill>
          <Scene3ZeroRecording />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: Multi-speaker */}
      <Sequence from={SCENES[3].from} durationInFrames={SCENES[3].duration + 10}>
        <AbsoluteFill>
          <Scene4MultiSpeaker />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 5: Comparison */}
      <Sequence from={SCENES[4].from} durationInFrames={SCENES[4].duration + 10}>
        <AbsoluteFill>
          <Scene5Comparison />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 6: Dashboard */}
      <Sequence from={SCENES[5].from} durationInFrames={SCENES[5].duration + 10}>
        <AbsoluteFill>
          <Scene6Dashboard />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 7: FREE */}
      <Sequence from={SCENES[6].from} durationInFrames={SCENES[6].duration + 10}>
        <AbsoluteFill>
          <Scene7Free />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 8: CTA */}
      <Sequence from={SCENES[7].from} durationInFrames={SCENES[7].duration}>
        <AbsoluteFill>
          <Scene8CTA />
        </AbsoluteFill>
      </Sequence>

      {/* Transition flashes at scene cuts */}
      {SCENES.slice(1).map((scene, i) => (
        <SceneTransition key={i} from={scene.from} />
      ))}
    </AbsoluteFill>
  );
};
