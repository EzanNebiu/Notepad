import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { TopToolbar } from '../components/Toolbar/TopToolbar';
import { NoteEditor } from '../components/Editor/NoteEditor';
import { MarkdownPreview } from '../components/Editor/MarkdownPreview';
import { CodeEditor } from '../components/Editor/CodeEditor';
import { ModeSwitcher } from '../components/Editor/ModeSwitcher';
import { NoteStats } from '../components/Editor/NoteStats';
import { ShareActions } from '../features/sharing/ShareActions';
import { UnlockDialog } from '../components/Modals/UnlockDialog';
import { PasswordDialog } from '../components/Modals/PasswordDialog';
import { ChangeSlugDialog } from '../components/Modals/ChangeSlugDialog';
import { Footer } from '../components/Footer/Footer';
import { useNote } from '../hooks/useNote';
import { CircularProgress } from '@mui/material';

export const NotePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || undefined;

  const [unlockDialogOpen, setUnlockDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [changeSlugDialogOpen, setChangeSlugDialogOpen] = useState(false);

  const {
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
    unlock,
    setPassword,
    removePassword,
    changeSlug,
  } = useNote(slug || '', token);

  useEffect(() => {
    if (!slug) {
      navigate('/');
    }
  }, [slug, navigate]);

  useEffect(() => {
    if (error === 'PASSWORD_REQUIRED') {
      setUnlockDialogOpen(true);
    }
  }, [error]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (saveStatus === 'unsaved') {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [saveStatus]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <CircularProgress />
        </div>
      </Layout>
    );
  }

  if (error && error !== 'PASSWORD_REQUIRED') {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Note Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Go Home
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!note) {
    return null;
  }

  const handleSpellCheckToggle = () => {
    updateSettings({ spellCheck: !note.settings.spellCheck });
  };

  const handleMonospaceToggle = () => {
    updateSettings({ monospace: !note.settings.monospace });
  };

  const renderEditor = () => {
    switch (note.mode) {
      case 'markdown':
        return isReadOnly ? (
          <MarkdownPreview
            content={note.content}
            monospace={note.settings.monospace}
          />
        ) : (
          <NoteEditor
            content={note.content}
            mode={note.mode}
            spellCheck={note.settings.spellCheck}
            monospace={note.settings.monospace}
            isReadOnly={isReadOnly}
            onChange={updateContent}
          />
        );
      case 'code':
        return (
          <CodeEditor
            content={note.content}
            language={note.language || 'plaintext'}
            isReadOnly={isReadOnly}
            onChange={updateContent}
            onLanguageChange={updateLanguage}
          />
        );
      default:
        return (
          <NoteEditor
            content={note.content}
            mode={note.mode}
            spellCheck={note.settings.spellCheck}
            monospace={note.settings.monospace}
            isReadOnly={isReadOnly}
            onChange={updateContent}
          />
        );
    }
  };

  return (
    <Layout>
      <TopToolbar
        saveStatus={saveStatus}
        isOwner={isOwner}
        spellCheck={note.settings.spellCheck}
        monospace={note.settings.monospace}
        onSpellCheckToggle={handleSpellCheckToggle}
        onMonospaceToggle={handleMonospaceToggle}
        onPasswordClick={() => setPasswordDialogOpen(true)}
        onChangeSlugClick={() => setChangeSlugDialogOpen(true)}
      />

      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="space-y-4 sm:space-y-6">
          {renderEditor()}

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-200 dark:border-[#2d3748]">
            <ModeSwitcher
              mode={note.mode}
              onChange={updateMode}
              disabled={isReadOnly}
            />
            <NoteStats content={note.content} updatedAt={note.updatedAt} />
          </div>

          {isOwner && (
            <div className="pt-4 border-t border-gray-200 dark:border-[#2d3748]">
              <ShareActions
                slug={note.slug}
                editableToken={note.editableToken}
                shareToken={note.shareToken}
                isOwner={isOwner}
              />
            </div>
          )}
        </div>

        <Footer />
      </div>

      <UnlockDialog
        open={unlockDialogOpen}
        onClose={() => setUnlockDialogOpen(false)}
        onUnlock={unlock}
      />

      <PasswordDialog
        open={passwordDialogOpen}
        hasPassword={note.isPasswordProtected}
        onClose={() => setPasswordDialogOpen(false)}
        onSetPassword={setPassword}
        onRemovePassword={removePassword}
      />

      <ChangeSlugDialog
        open={changeSlugDialogOpen}
        currentSlug={note.slug}
        onClose={() => setChangeSlugDialogOpen(false)}
        onChangeSlug={changeSlug}
      />
    </Layout>
  );
};
