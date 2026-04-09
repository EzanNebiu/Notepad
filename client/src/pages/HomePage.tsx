import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { Button, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { generateSlug } from '../utils/urlUtils';
import { useState } from 'react';
import { noteApi } from '../services/noteApi';

export const HomePage = () => {
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);

  const handleCreateNote = async () => {
    setCreating(true);
    try {
      const slug = generateSlug();
      const response = await noteApi.createNote({ slug });
      navigate(`/${response.note.slug}?token=${response.note.editableToken}`);
    } catch (err) {
      console.error('Failed to create note:', err);
      setCreating(false);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Notepad
          </h1>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
            Fast, shareable online notes. Each note lives at its own URL.
          </p>
          
          <div className="space-y-4">
            <Button
              variant="contained"
              size="large"
              startIcon={creating ? <CircularProgress size={20} color="inherit" /> : <AddIcon />}
              onClick={handleCreateNote}
              disabled={creating}
              sx={{ minWidth: 200, py: 1.5 }}
            >
              {creating ? 'Creating...' : 'Create New Note'}
            </Button>

            <div className="mt-12 text-left space-y-4">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Features
              </h2>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  <span>Instant note creation with unique URLs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  <span>Auto-save with real-time sync</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  <span>Multiple view modes: Raw, Markdown, Code</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  <span>Optional password protection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  <span>Share links with read-only access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  <span>Dark mode support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  <span>Customizable URL slugs</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
            <p>No sign-up required. Just create and share.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
