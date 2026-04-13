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
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mode:</span>
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={handleChange}
        size="small"
        disabled={disabled}
      >
        <ToggleButton value="raw">Raw</ToggleButton>
        <ToggleButton value="markdown">Markdown</ToggleButton>
        <ToggleButton value="code">Code</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};
