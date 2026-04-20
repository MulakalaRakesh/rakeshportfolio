import {Composition} from 'remotion';
import {SilentDowngrade} from './SilentDowngrade';
import {SilentDowngrade916} from './SilentDowngrade916';

const FPS = 30;
const TOTAL = 6 * FPS + 17 * FPS + 6 * FPS + 7 * FPS + 6 * FPS + 8 * FPS;

export const Root: React.FC = () => (
  <>
    <Composition
      id="SilentDowngrade"
      component={SilentDowngrade}
      durationInFrames={TOTAL}
      fps={FPS}
      width={1920}
      height={1080}
    />
    <Composition
      id="SilentDowngrade916"
      component={SilentDowngrade916}
      durationInFrames={TOTAL}
      fps={FPS}
      width={1080}
      height={1920}
    />
  </>
);
