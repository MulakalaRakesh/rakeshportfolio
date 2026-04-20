import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';

const FPS = 30;

const S1 = 6 * FPS;
const S2 = 17 * FPS;
const S3 = 6 * FPS;
const S4 = 7 * FPS;
const S5 = 6 * FPS;
const S6 = 8 * FPS;

export const SilentDowngrade: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#05070d', fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif'}}>
      <Sequence from={0} durationInFrames={S1}>
        <Scene1 />
      </Sequence>
      <Sequence from={S1} durationInFrames={S2}>
        <Scene2 />
      </Sequence>
      <Sequence from={S1 + S2} durationInFrames={S3}>
        <Scene3 />
      </Sequence>
      <Sequence from={S1 + S2 + S3} durationInFrames={S4}>
        <Scene4 />
      </Sequence>
      <Sequence from={S1 + S2 + S3 + S4} durationInFrames={S5}>
        <Scene5 />
      </Sequence>
      <Sequence from={S1 + S2 + S3 + S4 + S5} durationInFrames={S6}>
        <Scene6 />
      </Sequence>
    </AbsoluteFill>
  );
};

const fadeIn = (frame: number, start: number, duration = 15) =>
  interpolate(frame, [start, start + duration], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const lines = ['6,852 sessions.', '200,000 actions.', '73% dumber.'];
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', gap: 24}}>
      {lines.map((text, i) => {
        const start = 12 + i * 36;
        const opacity = fadeIn(frame, start, 12);
        const y = interpolate(frame, [start, start + 12], [14, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        return (
          <div
            key={i}
            style={{
              opacity,
              transform: `translateY(${y}px)`,
              color: i === 2 ? '#cfe1ff' : '#eaf2ff',
              fontWeight: 800,
              fontSize: 120,
              letterSpacing: '-0.01em',
              textShadow: '0 0 60px rgba(78,168,255,0.2)',
            }}
          >
            {text}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const scroll = interpolate(frame, [30, S2 - 30], [0, -1400], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const appear = fadeIn(frame, 0, 20);
  return (
    <AbsoluteFill style={{backgroundColor: '#0d1117', justifyContent: 'center', alignItems: 'center', opacity: appear}}>
      <div style={{width: 1400, height: 900, border: '1px solid #30363d', borderRadius: 14, background: '#0d1117', overflow: 'hidden', boxShadow: '0 40px 120px rgba(0,0,0,0.6)', position: 'relative'}}>
        <div style={{height: 52, display: 'flex', alignItems: 'center', gap: 10, padding: '0 20px', background: '#161b22', borderBottom: '1px solid #30363d', color: '#8b949e', fontSize: 16}}>
          <Dot color="#ff5f56" />
          <Dot color="#ffbd2e" />
          <Dot color="#27c93f" />
          <span style={{marginLeft: 16}}>github.com/stella-lorenzo/observations/issues/412</span>
        </div>
        <div style={{padding: '30px 40px', color: '#c9d1d9', fontSize: 18, lineHeight: 1.65, position: 'absolute', top: 52, left: 0, right: 0, transform: `translateY(${scroll}px)`}}>
          <h2 style={{fontSize: 30, color: '#e6edf3', marginBottom: 10}}>The model quietly changed underneath us</h2>
          <div style={{color: '#8b949e', fontSize: 15, marginBottom: 24}}>stella-lorenzo opened this issue · 6,852 sessions observed</div>
          <p>Over the past six weeks I've been logging every interaction across our fleet. Something shifted around March 3rd. The model name did not change. The pricing did not change. But the behavior did.</p>
          <pre style={{fontFamily: 'ui-monospace, Menlo, monospace', background: '#161b22', border: '1px solid #30363d', borderRadius: 8, padding: '16px 20px', color: '#d2a8ff', fontSize: 16, marginTop: 14}}>{`sessions:       6,852
actions:        203,441
affected runs:  72.8%
delta onset:    2026-03-03`}</pre>
          <p style={{marginTop: 18}}>The clearest regression is in pre-edit reads. Previously the agent would read the relevant files before proposing a diff. Now it guesses.</p>
          <div style={{height: 240, background: 'linear-gradient(135deg,#161b22,#0d1117)', border: '1px solid #30363d', borderRadius: 8, margin: '18px 0', display: 'grid', placeItems: 'center', color: '#6e7681', fontSize: 14}}>attachment-01.png — reads_per_edit.csv</div>
          <p>I'm publishing the raw logs. Verify it yourselves.</p>
          <div style={{height: 240, background: 'linear-gradient(135deg,#161b22,#0d1117)', border: '1px solid #30363d', borderRadius: 8, margin: '18px 0', display: 'grid', placeItems: 'center', color: '#6e7681', fontSize: 14}}>attachment-02.png — sampled transcripts</div>
          <p style={{marginTop: 18}}>Same model name. Same price. Different product.</p>
          <p style={{marginTop: 18}}>— Stella</p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Dot: React.FC<{color: string}> = ({color}) => <span style={{width: 14, height: 14, borderRadius: '50%', background: color, display: 'inline-block'}} />;

const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b1 = spring({frame: frame - 10, fps, config: {damping: 14}});
  const b2 = spring({frame: frame - 40, fps, config: {damping: 14}});
  const gap = fadeIn(frame, 75, 18);
  const delta = fadeIn(frame, 95, 18);
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <div style={{width: 1200, padding: 60}}>
        <h3 style={{fontSize: 22, color: '#8aa0bd', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 40}}>Code reads before editing</h3>
        <div style={{display: 'flex', gap: 100, alignItems: 'flex-end', height: 540, position: 'relative', borderBottom: '1px solid #1a2334'}}>
          <Bar label="February" value="6.6" heightPct={88} scale={b1} />
          <div style={{flex: 1, position: 'relative'}}>
            <Bar label="March" value="2.0" heightPct={27} scale={b2} />
            <div style={{position: 'absolute', right: -8, bottom: '27%', width: 3, height: `${0.60 * gap * 100}%`, background: '#ff4d5e'}} />
            <div style={{position: 'absolute', right: -180, bottom: '55%', color: '#ff4d5e', fontWeight: 700, fontSize: 22, opacity: delta}}>−70%</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Bar: React.FC<{label: string; value: string; heightPct: number; scale: number}> = ({label, value, heightPct, scale}) => (
  <div style={{flex: 1, height: '100%', position: 'relative', display: 'flex', alignItems: 'flex-end'}}>
    <div style={{flex: 1, height: `${heightPct}%`, background: 'linear-gradient(180deg,#4ea8ff,#1d6fd4)', borderRadius: '8px 8px 0 0', transform: `scaleY(${scale})`, transformOrigin: 'bottom', position: 'relative'}}>
      <div style={{position: 'absolute', top: -44, left: 0, right: 0, textAlign: 'center', fontWeight: 700, color: '#eaf2ff', fontSize: 32}}>{value}</div>
      <div style={{position: 'absolute', bottom: -40, left: 0, right: 0, textAlign: 'center', color: '#8aa0bd', fontSize: 18}}>{label}</div>
    </div>
  </div>
);

const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const left = fadeIn(frame, 15, 18);
  const right = fadeIn(frame, 45, 18);
  const cap = fadeIn(frame, 110, 20);
  const leftOut = `read: src/auth/middleware.ts
read: src/auth/token.ts
read: src/auth/scopes.ts
read: tests/auth.spec.ts

plan:
  1. extend Token with scope[]
  2. add requireScope(scope) guard
  3. update middleware chain
  4. backfill tests for 4 scopes

apply edits (4 files, +128 −22)
run tests: 41 passed`;
  const rightOut = `edit: src/auth/middleware.ts
  + if (token.scope) { /* ... */ }

done.`;
  return (
    <AbsoluteFill style={{flexDirection: 'row', background: '#0b1220', gap: 4}}>
      <Pane tag="February" prompt="refactor auth middleware to support scoped tokens" content={leftOut} opacity={left} />
      <Pane tag="March" prompt="refactor auth middleware to support scoped tokens" content={rightOut} opacity={right} />
      <div style={{position: 'absolute', bottom: '8%', left: 0, right: 0, textAlign: 'center', color: '#eaf2ff', fontSize: 36, fontWeight: 600, opacity: cap}}>
        Same model name. Same price. Different product.
      </div>
    </AbsoluteFill>
  );
};

const Pane: React.FC<{tag: string; prompt: string; content: string; opacity: number}> = ({tag, prompt, content, opacity}) => (
  <div style={{flex: 1, background: '#0d1117', padding: '48px 52px', position: 'relative', fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 22, lineHeight: 1.6, color: '#c9d1d9'}}>
    <div style={{position: 'absolute', top: 20, right: 28, fontSize: 16, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8aa0bd'}}>{tag}</div>
    <div style={{color: '#8aa0bd', fontSize: 18, marginBottom: 22, borderLeft: '2px solid #30363d', paddingLeft: 14}}>{prompt}</div>
    <pre style={{whiteSpace: 'pre-wrap', opacity, margin: 0, fontFamily: 'inherit', fontSize: 'inherit', color: 'inherit', background: 'transparent'}}>{content}</pre>
  </div>
);

const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const dim = interpolate(frame, [30, 120], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const shiftFill = `rgba(78,168,255,${0.1 + 0.4 * dim})`;
  const shiftStroke = `rgba(78,168,255,${0.3 + 0.7 * dim})`;
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <svg viewBox="0 0 820 360" width={1400} xmlns="http://www.w3.org/2000/svg">
        {[
          [120, 180, 270, 90], [120, 180, 270, 180], [120, 180, 270, 270],
          [270, 90, 450, 180], [270, 180, 450, 180], [270, 270, 450, 180],
          [450, 180, 640, 180], [640, 180, 780, 180],
        ].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#4ea8ff" strokeWidth={1.4} opacity={0.6} />
        ))}
        <Node cx={120} cy={180} label="input" />
        <Node cx={270} cy={90} label="read" />
        <circle cx={270} cy={180} r={22} fill={shiftFill} stroke={shiftStroke} strokeWidth={1.6} />
        <text x={240} y={225} fill="#8aa0bd" fontSize={14} fontFamily="ui-monospace, monospace">plan</text>
        <Node cx={270} cy={270} label="test" />
        <Node cx={450} cy={180} label="edit" />
        <Node cx={640} cy={180} label="verify" />
        <Node cx={780} cy={180} label="ship" />
      </svg>
    </AbsoluteFill>
  );
};

const Node: React.FC<{cx: number; cy: number; label: string}> = ({cx, cy, label}) => (
  <>
    <circle cx={cx} cy={cy} r={22} fill="#0d1524" stroke="#4ea8ff" strokeWidth={1.6} />
    <text x={cx - 22} y={cy + 45} fill="#8aa0bd" fontSize={14} fontFamily="ui-monospace, monospace">{label}</text>
  </>
);

const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const appear = fadeIn(frame, 0, 24);
  const q1 = fadeIn(frame, 18, 18);
  const q2 = fadeIn(frame, 80, 18);
  const q3 = fadeIn(frame, 150, 18);
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', opacity: appear}}>
      <div style={{width: 1400, aspectRatio: '16 / 10', borderRadius: 20, background: 'radial-gradient(ellipse at 30% 40%, #2a2a28 0%, #14140f 70%)', position: 'relative', overflow: 'hidden', boxShadow: '0 50px 140px rgba(0,0,0,0.6)'}}>
        <div style={{position: 'absolute', left: '50%', bottom: 0, transform: 'translateX(-50%)', width: '42%', height: '78%', background: 'radial-gradient(ellipse at 50% 20%, #3a2a22 0%, #1b120e 60%, transparent 70%)', borderRadius: '50% 50% 0 0'}} />
        <div style={{position: 'absolute', top: 0, left: 0, width: '55%', height: '100%', background: 'linear-gradient(120deg, rgba(255,240,210,0.18), transparent 60%)'}} />
        <div style={{position: 'absolute', left: '6%', right: '6%', bottom: '7%', color: '#eaf2ff'}}>
          <div style={{fontSize: 18, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#cfe1ff', opacity: 0.8}}>Raghava — narrator</div>
          <div style={{fontSize: 34, fontWeight: 600, marginTop: 10, minHeight: 100}}>
            <span style={{opacity: q1}}>The model didn't get worse overnight.</span>
            <span style={{opacity: q2}}> It got quieter about changing.</span>
            <span style={{opacity: q3}}> That's the part worth measuring.</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
