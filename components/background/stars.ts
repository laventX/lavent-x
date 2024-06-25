import { getRandomInteger } from '@/lib/utils';

export const renderBackgroundStars = (
  canvas: HTMLCanvasElement,
  starsCount: number,
  starsSpeed: number,
  spaceColor: string
) => {
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }

  let canvasCenter: {
    x: number;
    y: number;
  };

  let canvasWidth: number;
  let canvasHeight: number;

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

  const stars: Star[] = [];

  window.addEventListener('resize', () => {
    setCansvasSize();
  });

  const createStars = () => {
    for (let i = 0; i < starsCount; i++) {
      const newStar = new Star();

      newStar.angle = getRandomInteger(0, 2 * Math.PI);
      newStar.speed = getRandomInteger(10, 100);
      newStar.distance = getRandomInteger(
        20,
        canvasWidth / 2 + canvasHeight / 2
      );

      const lum = getRandomInteger(1, 255);
      newStar.fadeIn = getRandomInteger(0.01, 1);
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
        stars[i].angle = getRandomInteger(0, 2 * Math.PI);
        stars[i].speed = getRandomInteger(10, 100);
        stars[i].distance = getRandomInteger(
          1,
          canvasWidth / 2 + canvasHeight / 2
        );

        const lum = getRandomInteger(1, 255);
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

      ctx.fillStyle = `rgba(${stars[i].color.r},${stars[i].color.g},${stars[i].color.b},${starTrans})`;
      ctx.fillRect(starXPos, starYPos, 2, 2);
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
