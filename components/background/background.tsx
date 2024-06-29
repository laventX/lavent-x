'use client';

import { useEffect, useRef } from 'react';

import { colors } from '@/ui/colors';

import { renderBackgroundStars } from './stars';

const BackgroundConfig = {
  MAX_STARS_COUNT: 1200,
  STARS_COUNT_MULTIPLIER: 1,
  STARS_SPEED: 0.005,
  SPACE_COLOR: colors.space['500']
};

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    renderBackgroundStars({
      canvas: canvasRef.current,
      maxStarsCount: BackgroundConfig.MAX_STARS_COUNT,
      starsSpeed: BackgroundConfig.STARS_SPEED,
      spaceColor: BackgroundConfig.SPACE_COLOR
    });
  }, []);

  return (
    <div className={`fixed bottom-0 left-0 right-0 top-0 -z-50 bg-space-500`}>
      <canvas
        className={`pointer-events-none h-full w-full bg-space-500`}
        ref={canvasRef}
      />
    </div>
  );
}
