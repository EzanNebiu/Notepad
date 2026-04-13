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
        w-full p-4 sm:p-6 resize-y
        transition-colors duration-200
        bg-white dark:bg-[#1a1f2e]
        text-gray-900 dark:text-[#e2e8f0]
        border border-gray-300 dark:border-[#2d3748]
        rounded-lg
        placeholder:text-gray-400 dark:placeholder:text-[#718096]
        focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#60a5fa]
        ${monospace ? 'font-mono' : 'font-sans'}
        ${isReadOnly ? 'cursor-not-allowed opacity-75' : ''}
      `}
      style={{
        minHeight: '300px',
        height: '60vh',
        maxHeight: '600px',
        lineHeight: '1.6',
        fontSize: '15px',
      }}
    />
  );
};
