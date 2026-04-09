export type NoteMode = 'raw' | 'markdown' | 'code';

export type SaveStatus = 'saved' | 'saving' | 'unsaved' | 'error';

export interface NoteSettings {
  spellCheck: boolean;
  monospace: boolean;
  themePreference: 'light' | 'dark' | 'system';
}

export interface Note {
  id: string;
  slug: string;
  content: string;
  mode: NoteMode;
  language?: string;
  isPasswordProtected: boolean;
  isPublic: boolean;
  editableToken: string;
  shareToken: string;
  ownerId?: string;
  settings: NoteSettings;
  createdAt: string;
  updatedAt: string;
}

export interface NoteResponse {
  note: Note;
  isOwner: boolean;
  isReadOnly: boolean;
}

export interface CreateNoteRequest {
  slug?: string;
  content?: string;
  mode?: NoteMode;
  settings?: Partial<NoteSettings>;
}

export interface UpdateNoteRequest {
  content?: string;
  mode?: NoteMode;
  language?: string;
  settings?: Partial<NoteSettings>;
  isPublic?: boolean;
}

export interface UnlockNoteRequest {
  password: string;
}

export interface SetPasswordRequest {
  password: string;
}

export interface ChangeSlugRequest {
  newSlug: string;
}

export interface UnlockNoteResponse {
  editableToken: string;
  note: Note;
}

export interface ApiError {
  message: string;
  code?: string;
}
