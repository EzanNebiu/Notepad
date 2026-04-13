import { ChangeEvent } from 'react';

interface CodeEditorProps {
  content: string;
  language: string;
  isReadOnly: boolean;
  onChange: (content: string) => void;
  onLanguageChange: (language: string) => void;
}

const languages = [
  'plaintext',
  'javascript',
  'typescript',
  'python',
  'java',
  'cpp',
  'c',
  'csharp',
  'go',
  'rust',
  'ruby',
  'php',
  'swift',
  'kotlin',
  'sql',
  'html',
  'css',
  'json',
  'yaml',
  'markdown',
  'bash',
];

export const CodeEditor = ({
  content,
  language,
  isReadOnly,
  onChange,
  onLanguageChange,
}: CodeEditorProps) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onLanguageChange(e.target.value);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-[#a0aec0]">
          Language:
        </label>
        <select
          value={language}
          onChange={handleLanguageChange}
          disabled={isReadOnly}
          className="px-3 py-1 border border-gray-300 dark:border-[#2d3748] rounded bg-white dark:bg-[#232936] text-gray-900 dark:text-[#e2e8f0] text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#60a5fa]"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <textarea
        value={content}
        onChange={handleChange}
        readOnly={isReadOnly}
        spellCheck={false}
        placeholder={isReadOnly ? 'This note is read-only' : 'Paste your code here...'}
        className={`
          w-full h-[500px] p-6 resize-y
          transition-colors duration-200
          bg-gray-900 dark:bg-black
          text-gray-100 dark:text-[#e2e8f0]
          border border-gray-700 dark:border-[#2d3748]
          rounded-lg
          placeholder:text-gray-500 dark:placeholder:text-[#718096]
          focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#60a5fa]
          font-mono
          ${isReadOnly ? 'cursor-not-allowed opacity-75' : ''}
        `}
        style={{
          minHeight: '300px',
          lineHeight: '1.5',
          fontSize: '14px',
          tabSize: 2,
        }}
      />
    </div>
  );
};
