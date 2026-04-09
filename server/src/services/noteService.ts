import { Note, NoteDocument } from '../models/Note';
import { generateSlug, generateToken } from '../utils/slugUtils';
import { hashPassword, comparePassword } from '../utils/passwordUtils';
import { AppError } from '../middleware/errorHandler';

export interface CreateNoteData {
  slug?: string;
  content?: string;
  mode?: 'raw' | 'markdown' | 'code';
  settings?: Partial<{
    spellCheck: boolean;
    monospace: boolean;
    themePreference: 'light' | 'dark' | 'system';
  }>;
}

export interface UpdateNoteData {
  content?: string;
  mode?: 'raw' | 'markdown' | 'code';
  language?: string;
  settings?: Partial<{
    spellCheck: boolean;
    monospace: boolean;
    themePreference: 'light' | 'dark' | 'system';
  }>;
  isPublic?: boolean;
}

export class NoteService {
  async createNote(data: CreateNoteData): Promise<NoteDocument> {
    const slug = data.slug || generateSlug();

    const existingNote = await Note.findOne({ slug });
    if (existingNote) {
      throw new AppError(409, 'Note with this slug already exists', 'SLUG_EXISTS');
    }

    const note = new Note({
      slug,
      content: data.content || '',
      mode: data.mode || 'raw',
      editableToken: generateToken(),
      shareToken: generateToken(),
      settings: data.settings || {},
    });

    await note.save();
    return note;
  }

  async getNoteBySlug(slug: string, token?: string): Promise<{
    note: NoteDocument;
    isOwner: boolean;
    isReadOnly: boolean;
  }> {
    const note = await Note.findOne({ slug });

    if (!note) {
      throw new AppError(404, 'Note not found', 'NOTE_NOT_FOUND');
    }

    const isOwner = token === note.editableToken;
    const isReadOnly = token === note.shareToken;

    if (note.isPasswordProtected && !isOwner && !isReadOnly) {
      throw new AppError(403, 'Note is password protected', 'PASSWORD_REQUIRED');
    }

    return { note, isOwner, isReadOnly };
  }

  async updateNote(
    slug: string,
    token: string,
    data: UpdateNoteData
  ): Promise<NoteDocument> {
    const note = await Note.findOne({ slug });

    if (!note) {
      throw new AppError(404, 'Note not found', 'NOTE_NOT_FOUND');
    }

    if (token !== note.editableToken) {
      throw new AppError(403, 'Invalid token', 'INVALID_TOKEN');
    }

    if (data.content !== undefined) note.content = data.content;
    if (data.mode !== undefined) note.mode = data.mode;
    if (data.language !== undefined) note.language = data.language;
    if (data.isPublic !== undefined) note.isPublic = data.isPublic;

    if (data.settings) {
      note.settings = { ...note.settings, ...data.settings };
    }

    await note.save();
    return note;
  }

  async unlockNote(
    slug: string,
    password: string
  ): Promise<{ editableToken: string; note: NoteDocument }> {
    const note = await Note.findOne({ slug }).select('+passwordHash');

    if (!note) {
      throw new AppError(404, 'Note not found', 'NOTE_NOT_FOUND');
    }

    if (!note.isPasswordProtected || !note.passwordHash) {
      throw new AppError(400, 'Note is not password protected', 'NOT_PROTECTED');
    }

    const isValid = await comparePassword(password, note.passwordHash);

    if (!isValid) {
      throw new AppError(401, 'Invalid password', 'INVALID_PASSWORD');
    }

    return { editableToken: note.editableToken, note };
  }

  async setPassword(slug: string, token: string, password: string): Promise<void> {
    const note = await Note.findOne({ slug });

    if (!note) {
      throw new AppError(404, 'Note not found', 'NOTE_NOT_FOUND');
    }

    if (token !== note.editableToken) {
      throw new AppError(403, 'Invalid token', 'INVALID_TOKEN');
    }

    note.passwordHash = await hashPassword(password);
    note.isPasswordProtected = true;

    await note.save();
  }

  async removePassword(slug: string, token: string): Promise<void> {
    const note = await Note.findOne({ slug });

    if (!note) {
      throw new AppError(404, 'Note not found', 'NOTE_NOT_FOUND');
    }

    if (token !== note.editableToken) {
      throw new AppError(403, 'Invalid token', 'INVALID_TOKEN');
    }

    note.passwordHash = undefined;
    note.isPasswordProtected = false;

    await note.save();
  }

  async changeSlug(
    oldSlug: string,
    newSlug: string,
    token: string
  ): Promise<NoteDocument> {
    const note = await Note.findOne({ slug: oldSlug });

    if (!note) {
      throw new AppError(404, 'Note not found', 'NOTE_NOT_FOUND');
    }

    if (token !== note.editableToken) {
      throw new AppError(403, 'Invalid token', 'INVALID_TOKEN');
    }

    const existingNote = await Note.findOne({ slug: newSlug });
    if (existingNote) {
      throw new AppError(409, 'Note with this slug already exists', 'SLUG_EXISTS');
    }

    note.slug = newSlug;
    await note.save();

    return note;
  }

  async getShareInfo(slug: string, token: string): Promise<{
    editableUrl: string;
    shareUrl: string;
  }> {
    const note = await Note.findOne({ slug });

    if (!note) {
      throw new AppError(404, 'Note not found', 'NOTE_NOT_FOUND');
    }

    if (token !== note.editableToken) {
      throw new AppError(403, 'Invalid token', 'INVALID_TOKEN');
    }

    return {
      editableUrl: `/${slug}?token=${note.editableToken}`,
      shareUrl: `/${slug}?token=${note.shareToken}`,
    };
  }
}

export const noteService = new NoteService();
