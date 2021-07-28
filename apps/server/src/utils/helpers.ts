export const calcTotalPages = (count: number, limit: number) =>
  Math.ceil(count / limit);

export const parseStringToNumber = (param: string): number =>
  Number.parseInt(param, 10);
