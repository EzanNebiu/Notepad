import { Layout } from '../components/Layout/Layout';
import { Footer } from '../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

export const ContactPage = () => {
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

        <h1 className="text-4xl font-bold mb-6">Contact</h1>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg">
            Have questions, feedback, or issues with Notepad? We'd love to hear from you.
          </p>

          <div className="mt-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">General Inquiries</h2>
              <p>
                For general questions about the service, features, or suggestions for
                improvement, please reach out to us.
              </p>
              <p className="mt-2">
                Email: <a href="mailto:hello@notepad.example" className="text-blue-600 dark:text-blue-400">hello@notepad.example</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Technical Support</h2>
              <p>
                Experiencing technical issues? Let us know what's happening and we'll
                investigate.
              </p>
              <p className="mt-2">
                Email: <a href="mailto:support@notepad.example" className="text-blue-600 dark:text-blue-400">support@notepad.example</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Privacy & Security</h2>
              <p>
                For privacy concerns or to report security issues, please contact us
                directly.
              </p>
              <p className="mt-2">
                Email: <a href="mailto:privacy@notepad.example" className="text-blue-600 dark:text-blue-400">privacy@notepad.example</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Abuse Reports</h2>
              <p>
                To report abusive content or misuse of the service, please include the
                note URL and details.
              </p>
              <p className="mt-2">
                Email: <a href="mailto:abuse@notepad.example" className="text-blue-600 dark:text-blue-400">abuse@notepad.example</a>
              </p>
            </section>
          </div>

          <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm">
              <strong>Note:</strong> These are example email addresses. Replace them with
              your actual contact information when deploying the application.
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </Layout>
  );
};
