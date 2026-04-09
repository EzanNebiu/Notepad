import mongoose, { Schema, Document } from 'mongoose';

export interface NoteSettings {
  spellCheck: boolean;
  monospace: boolean;
  themePreference: 'light' | 'dark' | 'system';
}

export interface NoteDocument extends Document {
  slug: string;
  content: string;
  mode: 'raw' | 'markdown' | 'code';
  language?: string;
  isPasswordProtected: boolean;
  passwordHash?: string;
  isPublic: boolean;
  editableToken: string;
  shareToken: string;
  ownerId?: string;
  settings: NoteSettings;
  createdAt: Date;
  updatedAt: Date;
}

const noteSettingsSchema = new Schema<NoteSettings>(
  {
    spellCheck: { type: Boolean, default: true },
    monospace: { type: Boolean, default: false },
    themePreference: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system',
    },
  },
  { _id: false }
);

const noteSchema = new Schema<NoteDocument>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    content: {
      type: String,
      default: '',
      maxlength: 1000000,
    },
    mode: {
      type: String,
      enum: ['raw', 'markdown', 'code'],
      default: 'raw',
    },
    language: {
      type: String,
      default: 'plaintext',
    },
    isPasswordProtected: {
      type: Boolean,
      default: false,
    },
    passwordHash: {
      type: String,
      select: false,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    editableToken: {
      type: String,
      required: true,
      index: true,
    },
    shareToken: {
      type: String,
      required: true,
      index: true,
    },
    ownerId: {
      type: String,
      index: true,
    },
    settings: {
      type: noteSettingsSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient lookups
noteSchema.index({ slug: 1, editableToken: 1 });
noteSchema.index({ shareToken: 1 });

export const Note = mongoose.model<NoteDocument>('Note', noteSchema);
