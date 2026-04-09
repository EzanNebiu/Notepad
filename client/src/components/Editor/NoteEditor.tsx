import { ChangeEvent } from 'react';
import { NoteMode } from '@shared/types';

interface NoteEditorProps {
  content: string;
  mode: NoteMode;
  language?: string;
  spellCheck: boolean;
  monospace: boolean;
  isReadOnly: boolean;
  onChange: (content: string) => void;
}

export const NoteEditor = ({
  content,
  mode,
  spellCheck,
  monospace,
  isReadOnly,
  onChange,
}: NoteEditorProps) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <textarea
      value={content}
      onChange={handleChange}
      spellCheck={spellCheck}
      readOnly={isReadOnly}
      placeholder={isReadOnly ? 'This note is read-only' : 'Start typing...'}
      className={`
        w-full h-[500px] p-6 resize-y
        bg-white dark:bg-gray-800
        text-gray-900 dark:text-gray-100
        border border-gray-300 dark:border-gray-700
        rounded-lg
        focus:outline-none focus:ring-2 focus:ring-blue-500
        ${monospace ? 'font-mono' : 'font-sans'}
        ${isReadOnly ? 'cursor-not-allowed opacity-75' : ''}
      `}
      style={{
        minHeight: '300px',
        lineHeight: '1.6',
        fontSize: '15px',
      }}
    />
  );
};
