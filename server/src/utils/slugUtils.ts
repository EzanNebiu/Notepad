import { nanoid } from 'nanoid';

export const generateSlug = (length: number = 8): string => {
  return nanoid(length);
};

export const generateToken = (): string => {
  return nanoid(32);
};

export const isValidSlug = (slug: string): boolean => {
  const slugRegex = /^[a-zA-Z0-9_-]+$/;
  return slugRegex.test(slug) && slug.length >= 1 && slug.length <= 100;
};

const reservedSlugs = [
  'api',
  'admin',
  'login',
  'signup',
  'settings',
  'about',
  'privacy',
  'terms',
  'contact',
  'new',
  'create',
];

export const isReservedSlug = (slug: string): boolean => {
  return reservedSlugs.includes(slug.toLowerCase());
};
