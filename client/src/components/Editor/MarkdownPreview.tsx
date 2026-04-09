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
        w-full min-h-[500px] p-6
        bg-white dark:bg-gray-800
        text-gray-900 dark:text-gray-100
        border border-gray-300 dark:border-gray-700
        rounded-lg
        prose dark:prose-invert max-w-none
        ${monospace ? 'font-mono' : 'font-sans'}
      `}
      dangerouslySetInnerHTML={renderMarkdown()}
    />
  );
};
