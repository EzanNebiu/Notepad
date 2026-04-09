import { ReactNode } from 'react';
import { useTheme } from '../../hooks/useTheme';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <div className={`min-h-screen ${resolvedTheme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {children}
    </div>
  );
};
