import { useNavigate } from 'react-router-dom';
import { IconButton, Tooltip, Switch, Menu, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LockIcon from '@mui/icons-material/Lock';
import EditIcon from '@mui/icons-material/Edit';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsIcon from '@mui/icons-material/Settings';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import CodeIcon from '@mui/icons-material/Code';
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
  const { theme, setTheme, resolvedTheme } = useTheme();
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
    <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1
              className="text-xl font-bold text-gray-900 dark:text-gray-100 cursor-pointer"
              onClick={() => navigate('/')}
            >
              Notepad
            </h1>
            <SaveStatusIndicator status={saveStatus} />
          </div>

          <div className="flex items-center gap-2">
            <Tooltip title="New Note">
              <IconButton onClick={handleNewNote} size="small">
                <AddIcon />
              </IconButton>
            </Tooltip>

            {isOwner && (
              <>
                <Tooltip title="Password Protection">
                  <IconButton onClick={onPasswordClick} size="small">
                    <LockIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Change URL">
                  <IconButton onClick={onChangeSlugClick} size="small">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}

            <Tooltip title={`Spell Check: ${spellCheck ? 'On' : 'Off'}`}>
              <IconButton onClick={onSpellCheckToggle} size="small">
                <SpellcheckIcon color={spellCheck ? 'primary' : 'inherit'} />
              </IconButton>
            </Tooltip>

            <Tooltip title={`Monospace: ${monospace ? 'On' : 'Off'}`}>
              <IconButton onClick={onMonospaceToggle} size="small">
                <CodeIcon color={monospace ? 'primary' : 'inherit'} />
              </IconButton>
            </Tooltip>

            <Tooltip title={`${resolvedTheme === 'dark' ? 'Light' : 'Dark'} Mode`}>
              <IconButton onClick={handleThemeToggle} size="small">
                {resolvedTheme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>

            <Tooltip title="Tools">
              <IconButton onClick={handleToolsClick} size="small">
                <SettingsIcon />
              </IconButton>
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
