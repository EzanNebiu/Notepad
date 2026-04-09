import { useState } from 'react';
import { Button, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { copyToClipboard } from '../../utils/clipboard';
import { getFullUrl } from '../../utils/urlUtils';
import { Toast } from '../Shared/Toast';

interface ShareActionsProps {
  slug: string;
  editableToken?: string;
  shareToken?: string;
  isOwner: boolean;
}

export const ShareActions = ({
  slug,
  editableToken,
  shareToken,
  isOwner,
}: ShareActionsProps) => {
  const [toast, setToast] = useState({ open: false, message: '' });

  const editableUrl = editableToken
    ? getFullUrl(`/${slug}?token=${editableToken}`)
    : '';
  const shareUrl = shareToken ? getFullUrl(`/${slug}?token=${shareToken}`) : '';

  const handleCopy = async (url: string, type: string) => {
    const success = await copyToClipboard(url);
    setToast({
      open: true,
      message: success
        ? `${type} link copied to clipboard!`
        : 'Failed to copy link',
    });
  };

  return (
    <div className="space-y-3">
      {isOwner && editableUrl && (
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Editable Link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={editableUrl}
                className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-900 dark:text-gray-100"
              />
              <Tooltip title="Copy">
                <IconButton
                  size="small"
                  onClick={() => handleCopy(editableUrl, 'Editable')}
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
      )}

      {isOwner && shareUrl && (
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Read-Only Share Link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-900 dark:text-gray-100"
              />
              <Tooltip title="Copy">
                <IconButton
                  size="small"
                  onClick={() => handleCopy(shareUrl, 'Share')}
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
      )}

      <Toast
        open={toast.open}
        message={toast.message}
        onClose={() => setToast({ open: false, message: '' })}
      />
    </div>
  );
};
