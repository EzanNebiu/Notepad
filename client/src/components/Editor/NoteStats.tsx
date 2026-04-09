import { countWords, countCharacters, formatTimeAgo } from '../../utils/textUtils';

interface NoteStatsProps {
  content: string;
  updatedAt: string;
}

export const NoteStats = ({ content, updatedAt }: NoteStatsProps) => {
  const wordCount = countWords(content);
  const charCount = countCharacters(content);

  return (
    <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400">
      <div className="flex items-center gap-2">
        <span className="font-medium">Words:</span>
        <span>{wordCount.toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-medium">Characters:</span>
        <span>{charCount.toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-medium">Last saved:</span>
        <span>{formatTimeAgo(updatedAt)}</span>
      </div>
    </div>
  );
};
