import { Request, Response } from 'express';
import { noteService } from '../services/noteService';
import { asyncHandler } from '../middleware/errorHandler';

export const createNote = asyncHandler(async (req: Request, res: Response) => {
  const note = await noteService.createNote(req.body);

  res.status(201).json({
    note: {
      id: note._id,
      slug: note.slug,
      content: note.content,
      mode: note.mode,
      language: note.language,
      isPasswordProtected: note.isPasswordProtected,
      isPublic: note.isPublic,
      editableToken: note.editableToken,
      shareToken: note.shareToken,
      settings: note.settings,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    },
  });
});

export const getNote = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const token = req.query.token as string | undefined;

  const { note, isOwner, isReadOnly } = await noteService.getNoteBySlug(slug, token);

  res.json({
    note: {
      id: note._id,
      slug: note.slug,
      content: note.content,
      mode: note.mode,
      language: note.language,
      isPasswordProtected: note.isPasswordProtected,
      isPublic: note.isPublic,
      editableToken: isOwner ? note.editableToken : undefined,
      shareToken: isOwner ? note.shareToken : undefined,
      settings: note.settings,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    },
    isOwner,
    isReadOnly,
  });
});

export const updateNote = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const token = req.query.token as string;

  const note = await noteService.updateNote(slug, token, req.body);

  res.json({
    note: {
      id: note._id,
      slug: note.slug,
      content: note.content,
      mode: note.mode,
      language: note.language,
      isPasswordProtected: note.isPasswordProtected,
      isPublic: note.isPublic,
      editableToken: note.editableToken,
      shareToken: note.shareToken,
      settings: note.settings,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    },
  });
});

export const unlockNote = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const { password } = req.body;

  const { editableToken, note } = await noteService.unlockNote(slug, password);

  res.json({
    editableToken,
    note: {
      id: note._id,
      slug: note.slug,
      content: note.content,
      mode: note.mode,
      language: note.language,
      isPasswordProtected: note.isPasswordProtected,
      isPublic: note.isPublic,
      editableToken,
      shareToken: note.shareToken,
      settings: note.settings,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    },
  });
});

export const setPassword = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const token = req.query.token as string;
  const { password } = req.body;

  await noteService.setPassword(slug, token, password);

  res.json({ message: 'Password set successfully' });
});

export const removePassword = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const token = req.query.token as string;

  await noteService.removePassword(slug, token);

  res.json({ message: 'Password removed successfully' });
});

export const changeSlug = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const token = req.query.token as string;
  const { newSlug } = req.body;

  const note = await noteService.changeSlug(slug, newSlug, token);

  res.json({
    note: {
      id: note._id,
      slug: note.slug,
      content: note.content,
      mode: note.mode,
      language: note.language,
      isPasswordProtected: note.isPasswordProtected,
      isPublic: note.isPublic,
      editableToken: note.editableToken,
      shareToken: note.shareToken,
      settings: note.settings,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    },
  });
});

export const getShareInfo = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const token = req.query.token as string;

  const shareInfo = await noteService.getShareInfo(slug, token);

  res.json(shareInfo);
});
