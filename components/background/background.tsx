'use client';

import { useEffect, useRef } from 'react';
import { renderBackgroundStars } from './stars';
import { colors } from '@/ui/colors';

const BackgroundConfig = {
  STARS_COUNT: 1000,
  STARS_SPEED: 0.01,
  SPACE_COLOR: colors.space['500']
};

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      renderBackgroundStars(
        canvasRef.current,
        BackgroundConfig.STARS_COUNT,
        BackgroundConfig.STARS_SPEED,
        BackgroundConfig.SPACE_COLOR
      );
    }
  }, []);

  return (
    <div className={`fixed bottom-0 left-0 right-0 top-0 -z-50 bg-space-500`}>
      <canvas className={`h-full w-full bg-space-500`} ref={canvasRef} />
    </div>
  );
}
