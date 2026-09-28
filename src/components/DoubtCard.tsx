import React from 'react';
import { Doubt } from '../types';
import { MessageSquare, ArrowBigUp, Eye, CheckCircle2, Clock, User, Bookmark } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';

interface DoubtCardProps {
  doubt: Doubt;
  onView: (id: string) => void;
  answerCount: number;
}

export const DoubtCard: React.FC<DoubtCardProps> = ({ doubt, onView, answerCount }) => {
  const { toggleDoubtVote, hasUserVotedDoubt, toggleBookmark, isBookmarked } = useData();
  const { showToast } = useToast();
  const voted = hasUserVotedDoubt(doubt.id);
  const bookmarked = isBookmarked(doubt.id);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark(doubt.id, 'doubt');
    if (bookmarked) {
      showToast('Removed question from bookmarks', 'info');
    } else {
      showToast('Question saved to bookmarks!', 'success');
    }
  };

  const handleVoteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleDoubtVote(doubt.id);
    if (!voted) {
      showToast('Upvoted question! Helps peers find it.', 'success');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-[#2878D4]/40 hover:-translate-y-1 transition-all duration-200 group flex flex-col justify-between h-full">
      <div>
        {/* Top: Status & Context */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                doubt.status === 'Answered'
                  ? 'bg-emerald-50 text-[#1E9E62] border-emerald-200'
                  : 'bg-amber-50 text-[#B26A00] border-amber-200'
              }`}
            >
              {doubt.status === 'Answered' && <CheckCircle2 className="w-3 h-3 text-[#1E9E62]" />}
              {doubt.status}
            </span>
            <span className="text-xs font-semibold text-[#1557A6] hover:underline cursor-pointer" onClick={() => onView(doubt.id)}>
              {doubt.subject}
            </span>
          </div>

          <button
            onClick={handleBookmarkClick}
            aria-label={bookmarked ? "Remove bookmark" : "Save bookmark"}
            title={bookmarked ? "Bookmarked" : "Save question"}
            className={`p-1.5 rounded-lg border transition-all duration-200 ${
              bookmarked
                ? 'bg-[#EAF4FF] text-[#1557A6] border-blue-200 shadow-2xs'
                : 'text-slate-400 border-transparent hover:text-[#1557A6] hover:bg-[#EAF4FF]/60 hover:border-blue-100'
            }`}
          >
            <Bookmark className={`w-4 h-4 transition-transform active:scale-125 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3
          onClick={() => onView(doubt.id)}
          className="text-base font-bold text-[#172033] group-hover:text-[#1557A6] transition-colors cursor-pointer line-clamp-2 leading-snug mb-2"
        >
          {doubt.title}
        </h3>

        {/* Short description */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
          {doubt.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {doubt.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md hover:bg-slate-200 transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
          {doubt.tags.length > 3 && (
            <span className="text-[11px] text-slate-400 font-medium">
              +{doubt.tags.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div>
        {/* Author & Stats Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 truncate max-w-[160px]">
            <div className="w-5 h-5 rounded-full overflow-hidden bg-[#1557A6]/10 text-[#1557A6] shrink-0 text-[10px] font-bold flex items-center justify-center">
              {doubt.author_avatar ? (
                <img src={doubt.author_avatar} alt={doubt.author_name} className="w-full h-full object-cover" />
              ) : (
                doubt.author_name.charAt(0)
              )}
            </div>
            <span className="truncate font-medium text-slate-700">{doubt.author_name}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Upvote Button */}
            <button
              onClick={handleVoteClick}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold transition-colors ${
                voted
                  ? 'bg-[#EAF4FF] text-[#1557A6] border border-blue-200 shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              title={voted ? 'Undo upvote' : 'Upvote question'}
            >
              <ArrowBigUp className={`w-4 h-4 transition-transform active:scale-125 ${voted ? 'fill-current' : ''}`} />
              <span className="tabular-nums font-mono">{doubt.upvotes_count}</span>
            </button>

            {/* Answer count */}
            <span className="flex items-center gap-1 text-slate-600 font-mono text-xs" title={`${answerCount} answers`}>
              <MessageSquare className="w-3.5 h-3.5 text-[#1557A6]" />
              <span className="tabular-nums">{answerCount}</span>
            </span>

            {/* Views */}
            <span className="hidden sm:flex items-center gap-1 text-slate-400 font-mono text-xs" title="Views">
              <Eye className="w-3.5 h-3.5" />
              <span className="tabular-nums">{doubt.views_count}</span>
            </span>
          </div>
        </div>

        {/* View discussion button */}
        <button
          onClick={() => onView(doubt.id)}
          className="w-full mt-3 py-2 text-xs font-semibold text-[#1557A6] bg-[#EAF4FF] hover:bg-[#d8ecff] rounded-lg transition-colors text-center flex items-center justify-center gap-1.5"
        >
          <span>View Discussion & Answers ({answerCount})</span>
        </button>
      </div>
    </div>
  );
};

