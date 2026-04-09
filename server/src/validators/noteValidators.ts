import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';
import { isValidSlug, isReservedSlug } from '../utils/slugUtils';

export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ message: 'Validation error', errors: errors.array() });
    return;
  }
  next();
};

export const validateSlug = [
  param('slug')
    .trim()
    .custom((value) => {
      if (!isValidSlug(value)) {
        throw new Error('Invalid slug format. Use only letters, numbers, hyphens, and underscores.');
      }
      if (isReservedSlug(value)) {
        throw new Error('This slug is reserved.');
      }
      return true;
    }),
  validate,
];

export const validateCreateNote = [
  body('slug')
    .optional()
    .trim()
    .custom((value) => {
      if (value && !isValidSlug(value)) {
        throw new Error('Invalid slug format');
      }
      if (value && isReservedSlug(value)) {
        throw new Error('This slug is reserved');
      }
      return true;
    }),
  body('content').optional().isString().isLength({ max: 1000000 }),
  body('mode').optional().isIn(['raw', 'markdown', 'code']),
  body('settings').optional().isObject(),
  validate,
];

export const validateUpdateNote = [
  body('content').optional().isString().isLength({ max: 1000000 }),
  body('mode').optional().isIn(['raw', 'markdown', 'code']),
  body('language').optional().isString(),
  body('settings').optional().isObject(),
  body('isPublic').optional().isBoolean(),
  validate,
];

export const validatePassword = [
  body('password').isString().isLength({ min: 1, max: 128 }),
  validate,
];

export const validateChangeSlug = [
  body('newSlug')
    .trim()
    .custom((value) => {
      if (!isValidSlug(value)) {
        throw new Error('Invalid slug format');
      }
      if (isReservedSlug(value)) {
        throw new Error('This slug is reserved');
      }
      return true;
    }),
  validate,
];
