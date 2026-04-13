import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface MarkdownPreviewProps {
  content: string;
  monospace: boolean;
}

export const MarkdownPreview = ({ content, monospace }: MarkdownPreviewProps) => {
  const renderMarkdown = () => {
    const rawHtml = marked(content, { breaks: true });
    const cleanHtml = DOMPurify.sanitize(rawHtml as string);
    return { __html: cleanHtml };
  };

  return (
    <div
      className={`
        w-full min-h-[300px] p-4 sm:p-6
        transition-colors duration-200
        bg-white dark:bg-[#1a1f2e]
        text-gray-900 dark:text-[#e2e8f0]
        border border-gray-300 dark:border-[#2d3748]
        rounded-lg
        prose dark:prose-invert max-w-none
        prose-sm sm:prose-base
        ${monospace ? 'font-mono' : 'font-sans'}
      `}
      style={{
        minHeight: '300px',
        height: '60vh',
        maxHeight: '600px',
        overflow: 'auto'
      }}
      dangerouslySetInnerHTML={renderMarkdown()}
    />
  );
};
