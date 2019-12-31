export const currencyToInt = (c: string): number => {
  const parts = c.split('.');
  return Number(parts[0]) * 100 + Number(parts[1]);
};

export const intToCurrency = (n: number): string => {
  const cts = n % 100;
  return `${Math.floor(n / 100)}.${cts < 10 ? '0' : ''}${cts}`;
};
