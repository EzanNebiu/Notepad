import { nanoid } from 'nanoid';

export const generateSlug = (length: number = 8): string => {
  return nanoid(length);
};

export const getFullUrl = (path: string): string => {
  return `${window.location.origin}${path}`;
};
