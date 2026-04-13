export const generateSlug = (length: number = 8): string => {
  // Generate a URL-safe random string
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';
  let result = '';
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);
  
  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i] % chars.length];
  }
  
  return result;
};

export const getFullUrl = (path: string): string => {
  return `${window.location.origin}${path}`;
};
