import { SaveStatus } from '@shared/types';
import { CircularProgress } from '@mui/material';

interface SaveStatusIndicatorProps {
  status: SaveStatus;
}

export const SaveStatusIndicator = ({ status }: SaveStatusIndicatorProps) => {
  const getStatusDisplay = () => {
    switch (status) {
      case 'saving':
        return (
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <CircularProgress size={14} />
            <span>Saving...</span>
          </div>
        );
      case 'saved':
        return (
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
            <span>✓</span>
            <span>Saved</span>
          </div>
        );
      case 'unsaved':
        return (
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <span>✏️</span>
            <span>Unsaved</span>
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <span>⚠️</span>
            <span>Error</span>
          </div>
        );
    }
  };

  return <div className="text-sm">{getStatusDisplay()}</div>;
};
