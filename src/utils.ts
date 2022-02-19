export const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

type MaxMin = Record<'max' | 'min', number>;

export const getUniqueCoin = (
  coinIds: Set<string>,
  { min, max }: MaxMin
): [number, number, string] => {
  let height, width, id;
  do {
    width = random(min, max);
    height = random(min, max);
    id = `${height} ${width}`;
  } while (coinIds.has(id));
  return [height, width, id];
};

export const getClassName = (
  h: number,
  w: number,
  blackCoefficient: number,
  { min, max }: MaxMin
) => {
  let className = 'item';
  if (w < min || h < min || w > max || h > max) {
    className += ' green';
  } else if (Math.random() < blackCoefficient) {
    className += ' black';
  }
  return className;
};
