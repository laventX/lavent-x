export const getRandomNumber = (a: number, b: number) => {
  return (b - a) * Math.random() + a;
};

export const getDataAttribute = (element: HTMLElement, attribute: string) => {
  if (element === null) return '';

  return element?.getAttribute(`data-${attribute}`) ?? '';
};
