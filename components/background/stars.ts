import { getRandomNumber } from '@/lib/utils';
import clamp from 'just-clamp';

type backgroundStarsConfig = {
  canvas: HTMLCanvasElement;
  minStarsCount?: number;
  maxStarsCount?: number;
  starsCountMultiplier?: number;
  starsSpeed?: number;
  spaceColor?: string;
};

export const renderBackgroundStars = ({
  canvas,
  minStarsCount = 500,
  maxStarsCount = 1000,
  starsCountMultiplier = 1,
  starsSpeed = 0.1,
  spaceColor = '#000000'
}: backgroundStarsConfig) => {
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }

  const STARS_DENSITY = 1608; // lower = more dense

  let canvasCenter: {
    x: number;
    y: number;
  };

  let canvasWidth: number;
  let canvasHeight: number;

  let starsCount: number;

  const setStarsCount = () => {
    starsCount = clamp(
      minStarsCount,
      Math.floor(
        ((window.innerWidth * window.innerHeight) /
          window.devicePixelRatio /
          STARS_DENSITY) *
          starsCountMultiplier
      ),
      maxStarsCount
    );
  };

  const setCansvasSize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const scale = Math.max(window.devicePixelRatio, 1);

    canvasWidth = canvas.width;
    canvasHeight = canvas.height;

    canvas.width = canvasWidth * scale;
    canvas.height = canvasHeight * scale;

    canvas.style.width = canvasWidth + 'px';
    canvas.style.height = canvasHeight + 'px';

    ctx.scale(scale, scale);

    canvasCenter = { x: canvasWidth / 2, y: canvasHeight / 2 };
  };

  setCansvasSize();
  setStarsCount();

  class Star {
    angle: number;
    distance: number;
    speed: number;
    color: { r: number; g: number; b: number; a: number };
    fadeIn: number;

    constructor() {
      this.angle = 0;
      this.distance = 0;
      this.speed = 0;
      this.color = { r: 255, g: 255, b: 255, a: 1 };
      this.fadeIn = 0;
    }
  }

  let stars: Star[] = [];

  window.addEventListener('resize', () => {
    setCansvasSize();
    setStarsCount();

    if (stars.length > starsCount) {
      stars = stars.slice(0, starsCount);
    }

    if (stars.length < starsCount) {
      createStars();
    }
  });

  const createStars = () => {
    const newStarsCount = starsCount - stars.length;

    for (let i = 0; i < newStarsCount; i++) {
      const newStar = new Star();

      newStar.angle = getRandomNumber(0, 2 * Math.PI);
      newStar.speed = getRandomNumber(10, 100);
      newStar.distance = getRandomNumber(
        20,
        canvasWidth / 2 + canvasHeight / 2
      );

      const lum = getRandomNumber(1, 255);
      newStar.fadeIn = getRandomNumber(0.01, 1);
      newStar.color.r = lum;
      newStar.color.g = lum;
      newStar.color.b = lum;

      stars.push(newStar);
    }
  };

  const updateStars = () => {
    for (let i = 0; i < stars.length; i++) {
      stars[i].distance +=
        stars[i].speed *
        starsSpeed *
        (stars[i].distance / (canvasWidth / 2 + canvasHeight / 2));
      stars[i].fadeIn += 0.01;

      if (stars[i].fadeIn > 1) {
        stars[i].fadeIn = 1;
      }

      if (stars[i].distance > canvasWidth / 2 + canvasHeight / 2) {
        stars[i].angle = getRandomNumber(0, 2 * Math.PI);
        stars[i].speed = getRandomNumber(10, 100);
        stars[i].distance = getRandomNumber(
          1,
          canvasWidth / 2 + canvasHeight / 2
        );

        const lum = getRandomNumber(1, 255);
        stars[i].fadeIn = 0;
        stars[i].color.r = lum;
        stars[i].color.g = lum;
        stars[i].color.b = lum;
      }
    }
  };

  const draw = () => {
    ctx.fillStyle = spaceColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    for (let i = 0; i < stars.length; i++) {
      const starXPos =
        Math.cos(stars[i].angle) * stars[i].distance + canvasCenter.x;
      const starYPos =
        Math.sin(stars[i].angle) * stars[i].distance + canvasCenter.y;
      const starTrans =
        stars[i].color.a * (stars[i].distance / 100) * stars[i].fadeIn;

      ctx.beginPath();
      ctx.arc(starXPos, starYPos, 1, 0, 2 * Math.PI, false);
      ctx.fillStyle = `rgba(${stars[i].color.r},${stars[i].color.g},${stars[i].color.b},${starTrans})`;
      ctx.fill();
    }
  };

  const frame = () => {
    updateStars();
    draw();
    window.requestAnimationFrame(frame);
  };

  createStars();
  frame();
};
