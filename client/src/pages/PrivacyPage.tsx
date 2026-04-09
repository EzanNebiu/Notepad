import { Layout } from '../components/Layout/Layout';
import { Footer } from '../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

export const PrivacyPage = () => {
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

        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

        <div className="prose dark:prose-invert max-w-none space-y-6">
          <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
            <p>
              When you create a note on Notepad, we store:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The content of your notes</li>
              <li>Note metadata (creation date, last modified date)</li>
              <li>Your chosen settings (spell check, monospace, theme preference)</li>
              <li>Password hashes (if you protect a note with a password)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
            <p>
              We use the information we collect solely to provide the note-taking service.
              We do not sell, share, or use your data for any other purpose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>
            <p>
              We take reasonable measures to protect your data:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Passwords are hashed using bcrypt before storage</li>
              <li>Connections use HTTPS encryption</li>
              <li>Access tokens are required to edit notes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Data Retention</h2>
            <p>
              Notes are stored indefinitely unless you delete them. We may remove inactive
              notes after an extended period (typically 1+ years of inactivity).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
            <p>
              Since notes are accessible via URL without accounts, anyone with the editable
              link can modify or delete a note. Keep your editable links private.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact</h2>
            <p>
              For privacy-related questions, please contact us through the Contact page.
            </p>
          </section>
        </div>

        <Footer />
      </div>
    </Layout>
  );
};
