import { useState, useEffect, useCallback } from 'react';
import { Note, SaveStatus, NoteMode } from '@shared/types';
import { noteApi } from '../services/noteApi';
import { useDebounce } from './useDebounce';
import { AUTOSAVE_DEBOUNCE_MS } from '@shared/constants';

interface UseNoteReturn {
  note: Note | null;
  loading: boolean;
  error: string | null;
  saveStatus: SaveStatus;
  isOwner: boolean;
  isReadOnly: boolean;
  updateContent: (content: string) => void;
  updateMode: (mode: NoteMode) => void;
  updateLanguage: (language: string) => void;
  updateSettings: (settings: Partial<Note['settings']>) => void;
  manualSave: () => Promise<void>;
  unlock: (password: string) => Promise<void>;
  setPassword: (password: string) => Promise<void>;
  removePassword: () => Promise<void>;
  changeSlug: (newSlug: string) => Promise<void>;
  refreshNote: () => Promise<void>;
}

export const useNote = (slug: string, token?: string): UseNoteReturn => {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved');
  const [isOwner, setIsOwner] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [pendingContent, setPendingContent] = useState<string | null>(null);

  const debouncedContent = useDebounce(pendingContent, AUTOSAVE_DEBOUNCE_MS);

  const fetchNote = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await noteApi.getNote(slug, token);
      setNote(response.note);
      setIsOwner(response.isOwner);
      setIsReadOnly(response.isReadOnly);
    } catch (err) {
      const errorResponse = (err as { response?: { data?: { code?: string; message?: string }; status?: number } }).response;
      
      if (errorResponse?.data?.code === 'PASSWORD_REQUIRED') {
        setError('PASSWORD_REQUIRED');
      } else if (errorResponse?.status === 404) {
        setError(errorResponse?.data?.message || 'Note not found');
      } else {
        setError(errorResponse?.data?.message || 'Failed to load note');
      }
    } finally {
      setLoading(false);
    }
  }, [slug, token]);

  useEffect(() => {
    fetchNote();
  }, [fetchNote]);

  useEffect(() => {
    if (debouncedContent !== null && note && isOwner && token) {
      const autoSave = async () => {
        try {
          setSaveStatus('saving');
          await noteApi.updateNote(slug, token, { content: debouncedContent });
          setNote((prev) => prev ? { ...prev, content: debouncedContent } : null);
          setSaveStatus('saved');
          setPendingContent(null);
        } catch (err) {
          setSaveStatus('error');
          console.error('Auto-save failed:', err);
        }
      };
      autoSave();
    }
  }, [debouncedContent, slug, token, note, isOwner]);

  const updateContent = useCallback((content: string) => {
    setNote((prev) => prev ? { ...prev, content } : null);
    setPendingContent(content);
    setSaveStatus('unsaved');
  }, []);

  const updateMode = useCallback(async (mode: NoteMode) => {
    if (!note || !isOwner || !token) return;

    try {
      setSaveStatus('saving');
      await noteApi.updateNote(slug, token, { mode });
      setNote((prev) => prev ? { ...prev, mode } : null);
      setSaveStatus('saved');
    } catch (err) {
      setSaveStatus('error');
    }
  }, [note, isOwner, token, slug]);

  const updateLanguage = useCallback(async (language: string) => {
    if (!note || !isOwner || !token) return;

    try {
      setSaveStatus('saving');
      await noteApi.updateNote(slug, token, { language });
      setNote((prev) => prev ? { ...prev, language } : null);
      setSaveStatus('saved');
    } catch (err) {
      setSaveStatus('error');
    }
  }, [note, isOwner, token, slug]);

  const updateSettings = useCallback(async (settings: Partial<Note['settings']>) => {
    if (!note || !isOwner || !token) return;

    try {
      await noteApi.updateNote(slug, token, { settings });
      setNote((prev) => prev ? { ...prev, settings: { ...prev.settings, ...settings } } : null);
    } catch (err) {
      console.error('Failed to update settings:', err);
    }
  }, [note, isOwner, token, slug]);

  const manualSave = useCallback(async () => {
    if (!note || !isOwner || !token) return;

    try {
      setSaveStatus('saving');
      await noteApi.updateNote(slug, token, { content: note.content });
      setSaveStatus('saved');
      setPendingContent(null);
    } catch (err) {
      setSaveStatus('error');
    }
  }, [note, isOwner, token, slug]);

  const unlock = useCallback(async (password: string) => {
    try {
      const response = await noteApi.unlockNote(slug, { password });
      setNote(response.note);
      setIsOwner(true);
      setError(null);
      
      // Update URL with token
      const url = new URL(window.location.href);
      url.searchParams.set('token', response.editableToken);
      window.history.replaceState({}, '', url.toString());
    } catch (err) {
      throw new Error('Invalid password');
    }
  }, [slug]);

  const setPassword = useCallback(async (password: string) => {
    if (!isOwner || !token) return;

    try {
      await noteApi.setPassword(slug, token, { password });
      setNote((prev) => prev ? { ...prev, isPasswordProtected: true } : null);
    } catch (err) {
      throw new Error('Failed to set password');
    }
  }, [slug, token, isOwner]);

  const removePassword = useCallback(async () => {
    if (!isOwner || !token) return;

    try {
      await noteApi.removePassword(slug, token);
      setNote((prev) => prev ? { ...prev, isPasswordProtected: false } : null);
    } catch (err) {
      throw new Error('Failed to remove password');
    }
  }, [slug, token, isOwner]);

  const changeSlug = useCallback(async (newSlug: string) => {
    if (!isOwner || !token) return;

    try {
      const response = await noteApi.changeSlug(slug, token, { newSlug });
      setNote(response.note);
      
      // Navigate to new URL
      const url = new URL(window.location.href);
      url.pathname = `/${newSlug}`;
      window.history.pushState({}, '', url.toString());
    } catch (err) {
      throw new Error('Failed to change slug');
    }
  }, [slug, token, isOwner]);

  return {
    note,
    loading,
    error,
    saveStatus,
    isOwner,
    isReadOnly,
    updateContent,
    updateMode,
    updateLanguage,
    updateSettings,
    manualSave,
    unlock,
    setPassword,
    removePassword,
    changeSlug,
    refreshNote: fetchNote,
  };
};
