export const SLUG_REGEX = /^[a-zA-Z0-9_-]+$/;
export const MIN_SLUG_LENGTH = 3;
export const MAX_SLUG_LENGTH = 100;
export const MAX_CONTENT_LENGTH = 1000000; // 1MB
export const AUTOSAVE_DEBOUNCE_MS = 1000;
export const DEFAULT_SLUG_LENGTH = 8;

export const RESERVED_SLUGS = [
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

export const CODE_LANGUAGES = [
  'javascript',
  'typescript',
  'python',
  'java',
  'cpp',
  'c',
  'csharp',
  'go',
  'rust',
  'ruby',
  'php',
  'swift',
  'kotlin',
  'sql',
  'html',
  'css',
  'json',
  'yaml',
  'markdown',
  'bash',
  'plaintext',
] as const;

export type CodeLanguage = typeof CODE_LANGUAGES[number];
