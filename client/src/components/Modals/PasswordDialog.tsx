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

interface PasswordDialogProps {
  open: boolean;
  hasPassword: boolean;
  onClose: () => void;
  onSetPassword: (password: string) => Promise<void>;
  onRemovePassword: () => Promise<void>;
}

export const PasswordDialog = ({
  open,
  hasPassword,
  onClose,
  onSetPassword,
  onRemovePassword,
}: PasswordDialogProps) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSetPassword = async () => {
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await onSetPassword(password);
      setPassword('');
      setConfirmPassword('');
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to set password');
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePassword = async () => {
    try {
      setLoading(true);
      setError('');
      await onRemovePassword();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove password');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPassword('');
    setConfirmPassword('');
    setError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Password Protection</DialogTitle>
      <DialogContent>
        {hasPassword ? (
          <div className="space-y-4">
            <Typography variant="body2" color="text.secondary">
              This note is currently password protected. You can remove the password to make
              it accessible to anyone with the link.
            </Typography>
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <Typography variant="body2" color="text.secondary">
              Protect this note with a password. Only those who know the password will be
              able to edit it.
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!error}
            />
            <TextField
              margin="dense"
              label="Confirm Password"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!error}
              helperText={error}
            />
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {hasPassword ? (
          <Button
            onClick={handleRemovePassword}
            variant="contained"
            color="error"
            disabled={loading}
          >
            {loading ? 'Removing...' : 'Remove Password'}
          </Button>
        ) : (
          <Button onClick={handleSetPassword} variant="contained" disabled={loading}>
            {loading ? 'Setting...' : 'Set Password'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
