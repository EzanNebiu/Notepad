import { NoteMode } from '@shared/types';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

interface ModeSwitcherProps {
  mode: NoteMode;
  onChange: (mode: NoteMode) => void;
  disabled?: boolean;
}

export const ModeSwitcher = ({ mode, onChange, disabled }: ModeSwitcherProps) => {
  const handleChange = (_: React.MouseEvent<HTMLElement>, newMode: NoteMode | null) => {
    if (newMode !== null) {
      onChange(newMode);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Mode:</span>
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={handleChange}
        size="small"
        disabled={disabled}
        sx={{
          '& .MuiToggleButton-root': {
            px: { xs: 1, sm: 1.5 },
            fontSize: { xs: '0.75rem', sm: '0.875rem' }
          }
        }}
      >
        <ToggleButton value="raw">Raw</ToggleButton>
        <ToggleButton value="markdown">MD</ToggleButton>
        <ToggleButton value="code">Code</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};
