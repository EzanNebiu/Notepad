import { useNavigate } from 'react-router-dom';
import { Tooltip, Menu, MenuItem, Button } from '@mui/material';
import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { generateSlug } from '../../utils/urlUtils';
import { SaveStatusIndicator } from '../Shared/SaveStatusIndicator';
import { SaveStatus } from '@shared/types';

interface TopToolbarProps {
  saveStatus: SaveStatus;
  isOwner: boolean;
  spellCheck: boolean;
  monospace: boolean;
  onSpellCheckToggle: () => void;
  onMonospaceToggle: () => void;
  onPasswordClick: () => void;
  onChangeSlugClick: () => void;
}

export const TopToolbar = ({
  saveStatus,
  isOwner,
  spellCheck,
  monospace,
  onSpellCheckToggle,
  onMonospaceToggle,
  onPasswordClick,
  onChangeSlugClick,
}: TopToolbarProps) => {
  const navigate = useNavigate();
  const { setTheme, resolvedTheme } = useTheme();
  const [toolsAnchor, setToolsAnchor] = useState<null | HTMLElement>(null);

  const handleNewNote = () => {
    const newSlug = generateSlug();
    navigate(`/${newSlug}`);
  };

  const handleThemeToggle = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const handleToolsClick = (event: React.MouseEvent<HTMLElement>) => {
    setToolsAnchor(event.currentTarget);
  };

  const handleToolsClose = () => {
    setToolsAnchor(null);
  };

  return (
    <div className="border-b border-gray-200 dark:border-[#2d3748] bg-white dark:bg-[#1a1f2e] transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1
              className="text-xl font-bold text-gray-900 dark:text-[#e2e8f0] cursor-pointer hover:text-blue-600 dark:hover:text-[#60a5fa] transition-colors"
              onClick={() => navigate('/')}
            >
              Notepad
            </h1>
            <SaveStatusIndicator status={saveStatus} />
          </div>

          <div className="flex items-center gap-2">
            <Tooltip title="New Note">
              <Button onClick={handleNewNote} size="small">
                +
              </Button>
            </Tooltip>

            {isOwner && (
              <>
                <Tooltip title="Password Protection">
                  <Button onClick={onPasswordClick} size="small">
                    🔒
                  </Button>
                </Tooltip>

                <Tooltip title="Change URL">
                  <Button onClick={onChangeSlugClick} size="small">
                    ✏️
                  </Button>
                </Tooltip>
              </>
            )}

            <Tooltip title={`Spell Check: ${spellCheck ? 'On' : 'Off'}`}>
              <Button onClick={onSpellCheckToggle} size="small">
                {spellCheck ? '✓' : 'ABC'}
              </Button>
            </Tooltip>

            <Tooltip title={`Monospace: ${monospace ? 'On' : 'Off'}`}>
              <Button onClick={onMonospaceToggle} size="small">
                {monospace ? '{;}' : 'Tt'}
              </Button>
            </Tooltip>

            <Tooltip title={`${resolvedTheme === 'dark' ? 'Light' : 'Dark'} Mode`}>
              <Button onClick={handleThemeToggle} size="small">
                {resolvedTheme === 'dark' ? '☀️' : '🌙'}
              </Button>
            </Tooltip>

            <Tooltip title="Tools">
              <Button onClick={handleToolsClick} size="small">
                ⚙️
              </Button>
            </Tooltip>

            <Menu
              anchorEl={toolsAnchor}
              open={Boolean(toolsAnchor)}
              onClose={handleToolsClose}
            >
              <MenuItem onClick={() => navigate('/about')}>About</MenuItem>
              <MenuItem onClick={() => navigate('/privacy')}>Privacy</MenuItem>
              <MenuItem onClick={() => navigate('/terms')}>Terms</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};
