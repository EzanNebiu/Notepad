import { Layout } from '../components/Layout/Layout';
import { Footer } from '../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

export const TermsPage = () => {
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

        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>

        <div className="prose dark:prose-invert max-w-none space-y-6">
          <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Acceptance of Terms</h2>
            <p>
              By accessing and using Notepad, you agree to be bound by these Terms of
              Service. If you do not agree to these terms, please do not use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Use of Service</h2>
            <p>
              Notepad is provided as-is for creating and sharing text notes. You may use
              the service for lawful purposes only.
            </p>
            <p className="mt-2">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Store illegal content</li>
              <li>Use the service to spam or harass others</li>
              <li>Attempt to gain unauthorized access to the service</li>
              <li>Use the service to distribute malware or malicious code</li>
              <li>Abuse the service in ways that impact other users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Content Responsibility</h2>
            <p>
              You are solely responsible for the content you create and share through
              Notepad. We do not monitor or review note content, but reserve the right to
              remove content that violates these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Service Availability</h2>
            <p>
              We strive to keep Notepad available 24/7, but do not guarantee uninterrupted
              access. The service may be temporarily unavailable for maintenance or due to
              technical issues.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Limitation of Liability</h2>
            <p>
              Notepad is provided "as is" without warranties of any kind. We are not liable
              for any damages arising from the use or inability to use the service,
              including data loss.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of the service
              after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact</h2>
            <p>
              For questions about these terms, please contact us through the Contact page.
            </p>
          </section>
        </div>

        <Footer />
      </div>
    </Layout>
  );
};
