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

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

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

  const canvasCenter = { x: canvas.width / 2, y: canvas.height / 2 };
  const stars: Star[] = [];

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasCenter.x = canvas.width / 2;
    canvasCenter.y = canvas.height / 2;
  });

  const createStars = () => {
    for (let i = 0; i < starsCount; i++) {
      const newStar = new Star();

      newStar.angle = getRandomInteger(0, 2 * Math.PI);
      newStar.speed = getRandomInteger(10, 100);
      newStar.distance = getRandomInteger(
        20,
        canvas.width / 2 + canvas.height / 2
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
        (stars[i].distance / (canvas.width / 2 + canvas.height / 2));
      stars[i].fadeIn += 0.01;

      if (stars[i].fadeIn > 1) {
        stars[i].fadeIn = 1;
      }

      if (stars[i].distance > canvas.width / 2 + canvas.height / 2) {
        stars[i].angle = getRandomInteger(0, 2 * Math.PI);
        stars[i].speed = getRandomInteger(10, 100);
        stars[i].distance = getRandomInteger(
          1,
          canvas.width / 2 + canvas.height / 2
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
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
