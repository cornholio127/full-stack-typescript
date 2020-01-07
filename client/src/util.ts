import { FilterType } from './components/filter/types';

export const slug = (label: string, id: string): string =>
  label
    .toLowerCase()
    .split(' ')
    .concat(id)
    .join('-');

export const idFromSlug = (slug: string): string => {
  const parts = slug.split('-');
  return parts[parts.length - 1];
};

export const categoryUri = (slug: string, filter: FilterType[]): string => {
  let query = '';
  if (filter.length > 0) {
    query =
      '?' +
      filter
        .map(f => `${encodeURIComponent(f[0])}=${encodeURIComponent(f[1])}`)
        .join('&');
  }
  return `/tag/${slug}${query}`;
};

export const currencyToInt = (c: string): number => {
  const parts = c.split('.');
  return Number(parts[0]) * 100 + Number(parts[1]);
};

export const intToCurrency = (n: number): string => {
  const cts = n % 100;
  return `${Math.floor(n / 100)}.${cts < 10 ? '0' : ''}${cts}`;
};

export const isEmpty = (value?: unknown): boolean => {
  if (value === undefined || value === null) {
    return true;
  }
  if (typeof value === 'object') {
    return Object.keys(value as object).length === 0;
  }
  if (typeof value === 'string') {
    return (value as string).trim().length === 0;
  }
  if (typeof value === 'boolean') {
    return value === false;
  }
  return false;
};
