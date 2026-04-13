import { countWords, countCharacters, formatTimeAgo } from '../../utils/textUtils';

interface NoteStatsProps {
  content: string;
  updatedAt: string;
}

export const NoteStats = ({ content, updatedAt }: NoteStatsProps) => {
  const wordCount = countWords(content);
  const charCount = countCharacters(content);

  return (
    <div className="flex flex-wrap gap-3 sm:gap-6 text-xs sm:text-sm text-gray-600 dark:text-[#a0aec0]">
      <div className="flex items-center gap-1 sm:gap-2">
        <span className="font-medium">Words:</span>
        <span>{wordCount.toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <span className="font-medium">Chars:</span>
        <span>{charCount.toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <span className="font-medium hidden sm:inline">Last saved:</span>
        <span className="sm:hidden font-medium">Saved:</span>
        <span>{formatTimeAgo(updatedAt)}</span>
      </div>
    </div>
  );
};
