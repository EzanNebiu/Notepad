import { ReactNode } from 'react';
import { useTheme } from '../../hooks/useTheme';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  useTheme(); // Initialize theme

  return (
    <div 
      className="
        min-h-screen transition-colors duration-200
        bg-gray-50 dark:bg-[#0f1419]
        text-gray-900 dark:text-[#e2e8f0]
      "
    >
      {children}
    </div>
  );
};
