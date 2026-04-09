import { Note, NoteResponse, CreateNoteRequest, UpdateNoteRequest, UnlockNoteRequest, SetPasswordRequest, ChangeSlugRequest, UnlockNoteResponse } from '@shared/types';
import { API_URL } from '../constants';
import axios from 'axios';

const api = axios.create({
  baseURL: API_URL,
});

export const noteApi = {
  createNote: async (data: CreateNoteRequest): Promise<{ note: Note }> => {
    const response = await api.post('/notes', data);
    return response.data;
  },

  getNote: async (slug: string, token?: string): Promise<NoteResponse> => {
    const response = await api.get(`/notes/${slug}`, {
      params: token ? { token } : {},
    });
    return response.data;
  },

  updateNote: async (
    slug: string,
    token: string,
    data: UpdateNoteRequest
  ): Promise<{ note: Note }> => {
    const response = await api.patch(`/notes/${slug}`, data, {
      params: { token },
    });
    return response.data;
  },

  unlockNote: async (
    slug: string,
    data: UnlockNoteRequest
  ): Promise<UnlockNoteResponse> => {
    const response = await api.post(`/notes/${slug}/unlock`, data);
    return response.data;
  },

  setPassword: async (
    slug: string,
    token: string,
    data: SetPasswordRequest
  ): Promise<{ message: string }> => {
    const response = await api.post(`/notes/${slug}/password`, data, {
      params: { token },
    });
    return response.data;
  },

  removePassword: async (
    slug: string,
    token: string
  ): Promise<{ message: string }> => {
    const response = await api.delete(`/notes/${slug}/password`, {
      params: { token },
    });
    return response.data;
  },

  changeSlug: async (
    slug: string,
    token: string,
    data: ChangeSlugRequest
  ): Promise<{ note: Note }> => {
    const response = await api.post(`/notes/${slug}/change-slug`, data, {
      params: { token },
    });
    return response.data;
  },

  getShareInfo: async (
    slug: string,
    token: string
  ): Promise<{ editableUrl: string; shareUrl: string }> => {
    const response = await api.get(`/notes/${slug}/share`, {
      params: { token },
    });
    return response.data;
  },
};
