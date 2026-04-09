import { Layout } from '../components/Layout/Layout';
import { Footer } from '../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

export const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Home
        </button>

        <h1 className="text-4xl font-bold mb-6">About Notepad</h1>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg">
            Notepad is a minimalist, fast, and shareable online notepad inspired by the
            simplicity of notepad.pw. Each note lives at its own unique URL, making it
            incredibly easy to create, edit, and share notes.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Philosophy</h2>
          <p>
            We believe note-taking should be simple and frictionless. No accounts, no
            complex interfaces, no distractions. Just open a URL, start typing, and share.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Features</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Instant note creation with shareable URLs</li>
            <li>Auto-save functionality with manual save option</li>
            <li>Multiple viewing modes: Raw text, Markdown preview, and Code editor</li>
            <li>Optional password protection for sensitive notes</li>
            <li>Customizable URL slugs</li>
            <li>Read-only share links</li>
            <li>Word and character count</li>
            <li>Spell check toggle</li>
            <li>Monospace font option</li>
            <li>Light and dark mode</li>
            <li>Mobile-responsive design</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Privacy</h2>
          <p>
            Your notes are stored securely. Password-protected notes use bcrypt hashing for
            security. We recommend not storing highly sensitive information, as this is
            designed as a quick-sharing tool, not a secure vault.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Technology</h2>
          <p>Built with modern web technologies:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>React 19 with TypeScript</li>
            <li>Vite for fast development</li>
            <li>Tailwind CSS for styling</li>
            <li>Material UI for select components</li>
            <li>Node.js and Express backend</li>
            <li>MongoDB database</li>
          </ul>
        </div>

        <Footer />
      </div>
    </Layout>
  );
};
