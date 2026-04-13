import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Alert } from '@mui/material';
import { generateSlug } from '../utils/urlUtils';
import { noteApi } from '../services/noteApi';
import {Footer} from "@/components/Footer/Footer.tsx";

export const HomePage = () => {
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);
  const [customSlugDialogOpen, setCustomSlugDialogOpen] = useState(false);
  const [customSlug, setCustomSlug] = useState('');
  const [slugError, setSlugError] = useState('');

  const handleCreateNote = async (slug?: string) => {
    setCreating(true);
    setSlugError('');
    try {
      const noteSlug = slug || generateSlug();
      const response = await noteApi.createNote({ slug: noteSlug });
      navigate(`/${response.note.slug}?token=${response.note.editableToken}`);
    } catch (err: any) {
      console.error('Failed to create note:', err);
      const errorMessage = err?.response?.data?.message || 'Failed to create note';
      setSlugError(errorMessage);
      setCreating(false);
    }
  };

  const handleQuickCreate = () => {
    handleCreateNote();
  };

  const handleCustomCreate = () => {
    setCustomSlugDialogOpen(true);
  };

  const handleCustomSlugSubmit = () => {
    if (!customSlug.trim()) {
      setSlugError('Please enter a slug');
      return;
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(customSlug)) {
      setSlugError('Slug can only contain letters, numbers, hyphens, and underscores');
      return;
    }
    if (customSlug.length < 3) {
      setSlugError('Slug must be at least 3 characters long');
      return;
    }
    setCustomSlugDialogOpen(false);
    handleCreateNote(customSlug);
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-[#e2e8f0]">
            Notepad
          </h1>
          <p className="text-xl mb-8 text-gray-600 dark:text-[#a0aec0]">
            Fast, shareable online notes. Each note lives at its own URL.
          </p>
          
          <div className="space-y-4">
            {slugError && (
              <Alert severity="error" onClose={() => setSlugError('')}>
                {slugError}
              </Alert>
            )}
            <div className="flex gap-3 justify-center">
              <Button
                variant="contained"
                size="large"
                onClick={handleQuickCreate}
                disabled={creating}
                sx={{ minWidth: 200, py: 1.5 }}
              >
                {creating ? 'Creating...' : '+ Create New Note'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={handleCustomCreate}
                disabled={creating}
                sx={{ minWidth: 200, py: 1.5 }}
              >
                Custom URL
              </Button>
            </div>

            <div className="mt-12 text-left space-y-4">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-[#e2e8f0]">
                Features
              </h2>
              <ul className="space-y-2 text-gray-700 dark:text-[#a0aec0]">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-[#60a5fa]">✓</span>
                  <span>Instant note creation with unique URLs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-[#60a5fa]">✓</span>
                  <span>Auto-save with real-time sync</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-[#60a5fa]">✓</span>
                  <span>Multiple view modes: Raw, Markdown, Code</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-[#60a5fa]">✓</span>
                  <span>Optional password protection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-[#60a5fa]">✓</span>
                  <span>Share links with read-only access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-[#60a5fa]">✓</span>
                  <span>Dark mode support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-[#60a5fa]">✓</span>
                  <span>Customizable URL slugs</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-sm text-gray-500 dark:text-[#718096]">
            <p>No sign-up required. Just create and share.</p>
          </div>
          <Footer></Footer>
        </div>
      </div>

      <Dialog open={customSlugDialogOpen} onClose={() => setCustomSlugDialogOpen(false)}>
        <DialogTitle>Create Note with Custom URL</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Custom URL"
            fullWidth
            value={customSlug}
            onChange={(e) => setCustomSlug(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleCustomSlugSubmit();
              }
            }}
            helperText="Use letters, numbers, hyphens, or underscores (e.g., tom001, my-note)"
            error={!!slugError}
          />
          {slugError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {slugError}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCustomSlugDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCustomSlugSubmit} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};
