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
