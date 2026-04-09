import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from '@mui/material';

interface ChangeSlugDialogProps {
  open: boolean;
  currentSlug: string;
  onClose: () => void;
  onChangeSlug: (newSlug: string) => Promise<void>;
}

export const ChangeSlugDialog = ({
  open,
  currentSlug,
  onClose,
  onChangeSlug,
}: ChangeSlugDialogProps) => {
  const [newSlug, setNewSlug] = useState(currentSlug);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = async () => {
    const trimmedSlug = newSlug.trim();

    if (!trimmedSlug) {
      setError('Slug cannot be empty');
      return;
    }

    if (trimmedSlug === currentSlug) {
      setError('New slug must be different');
      return;
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(trimmedSlug)) {
      setError('Slug can only contain letters, numbers, hyphens, and underscores');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await onChangeSlug(trimmedSlug);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to change slug');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setNewSlug(currentSlug);
    setError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Change Note URL</DialogTitle>
      <DialogContent>
        <div className="space-y-4">
          <Typography variant="body2" color="text.secondary">
            Change the URL slug for this note. The note will be accessible at the new URL.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="URL Slug"
            type="text"
            fullWidth
            value={newSlug}
            onChange={(e) => setNewSlug(e.target.value)}
            error={!!error}
            helperText={error || `Note will be at: ${window.location.origin}/${newSlug}`}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleChange} variant="contained" disabled={loading}>
          {loading ? 'Changing...' : 'Change URL'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
