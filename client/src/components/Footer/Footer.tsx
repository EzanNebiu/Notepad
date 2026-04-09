import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="mt-12 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
      <div className="space-x-6">
        <Link to="/about" className="hover:underline">
          About
        </Link>
        <Link to="/privacy" className="hover:underline">
          Privacy
        </Link>
        <Link to="/terms" className="hover:underline">
          Terms
        </Link>
        <Link to="/contact" className="hover:underline">
          Contact
        </Link>
      </div>
      <div className="mt-2 text-xs">
        © {new Date().getFullYear()} Notepad. Fast, shareable notes.
      </div>
    </footer>
  );
};
