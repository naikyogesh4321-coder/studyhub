import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { AnswerCard } from '../components/AnswerCard';
import { ReportModal } from '../components/ReportModal';
import {
  ArrowLeft,
  ArrowBigUp,
  Bookmark,
  Share2,
  AlertTriangle,
  Send,
  CheckCircle2,
  Eye,
  Trash2,
  Paperclip,
  FileText
} from 'lucide-react';

interface DoubtDetailsProps {
  doubtId: string;
  navigate: (path: string) => void;
}

export const DoubtDetails: React.FC<DoubtDetailsProps> = ({ doubtId, navigate }) => {
  const {
    doubts,
    answers,
    recordDoubtView,
    toggleDoubtVote,
    hasUserVotedDoubt,
    toggleBookmark,
    isBookmarked,
    postAnswer,
    deleteDoubt
  } = useData();

  const { user } = useAuth();
  const [newAnswerText, setNewAnswerText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const doubt = doubts.find(d => d.id === doubtId);

  useEffect(() => {
    if (doubtId) {
      recordDoubtView(doubtId);
    }
  }, [doubtId]);

  if (!doubt) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Doubt Not Found</h2>
        <p className="text-xs text-slate-500">The requested question could not be found or has been removed.</p>
        <button
          onClick={() => navigate('/doubts')}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#1557A6] rounded-lg"
        >
          Back to Doubt Board
        </button>
      </div>
    );
  }

  const doubtAnswers = answers
    .filter(a => a.doubt_id === doubtId)
    .sort((a, b) => {
      // Show accepted answer first, then by upvotes
      if (a.is_accepted && !b.is_accepted) return -1;
      if (!a.is_accepted && b.is_accepted) return 1;
      return b.upvotes_count - a.upvotes_count;
    });

  const voted = hasUserVotedDoubt(doubt.id);
  const bookmarked = isBookmarked(doubt.id);
  const isDoubtAuthor = user?.id === doubt.author_id;
  const canDeleteDoubt = user?.id === doubt.author_id || user?.role === 'admin';

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeleteDoubt = async () => {
    if (window.confirm('Are you sure you want to permanently delete this question discussion?')) {
      const res = await deleteDoubt(doubt.id);
      if (res.success) {
        navigate('/doubts');
      }
    }
  };

  const handlePostAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    if (!newAnswerText.trim()) {
      setErrorMessage('Please type your solution before posting.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);
    const res = await postAnswer(doubt.id, newAnswerText);
    setIsSubmitting(false);

    if (res.success) {
      setNewAnswerText('');
    } else {
      setErrorMessage(res.error || 'Failed to post answer.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/doubts')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#1557A6] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Doubt Board</span>
        </button>
      </div>

      {/* Question Card Container */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Top Badges & Meta */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded border ${
                doubt.status === 'Answered'
                  ? 'bg-emerald-50 text-[#1E9E62] border-emerald-200'
                  : 'bg-amber-50 text-[#E5A11A] border-amber-200'
              }`}
            >
              {doubt.status === 'Answered' && <CheckCircle2 className="w-3.5 h-3.5" />}
              {doubt.status}
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#EAF4FF] text-[#1557A6]">
              {doubt.subject}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied' : 'Share'}</span>
            </button>

            <button
              onClick={() => toggleBookmark(doubt.id, 'doubt')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors border ${
                bookmarked
                  ? 'bg-[#EAF4FF] text-[#1557A6] border-blue-200'
                  : 'text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
              <span>{bookmarked ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={() => setReportModalOpen(true)}
              className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg"
              title="Report Question"
            >
              <AlertTriangle className="w-4 h-4" />
            </button>

            {canDeleteDoubt && (
              <button
                onClick={handleDeleteDoubt}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                title="Delete Question"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Question Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2A5B] tracking-tight leading-snug">
          {doubt.title}
        </h1>

        {/* Academic Context line */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 font-medium">
          <span className="text-[#1557A6] font-bold">{doubt.subject}</span>
          <span>·</span>
          <span>{doubt.course}</span>
          <span>·</span>
          <span>{doubt.semester}</span>
          <span>·</span>
          <span>Asked {new Date(doubt.created_at).toLocaleDateString()}</span>
        </div>

        {/* Question Description */}
        <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line bg-slate-50/70 p-5 rounded-xl border border-slate-100">
          {doubt.description}
        </div>

        {/* Optional attachment preview */}
        {doubt.attachment_url && (
          <div className="flex items-center gap-2 p-3 bg-slate-100 rounded-lg text-xs text-slate-700">
            <Paperclip className="w-4 h-4 text-slate-500" />
            <span className="font-medium">Attachment:</span>
            <a
              href={doubt.attachment_url}
              target="_blank"
              rel="noreferrer"
              className="text-[#1557A6] underline hover:text-[#0B2A5B] truncate"
            >
              {doubt.attachment_name || 'Download Attached Reference File'}
            </a>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {doubt.tags.map((tag, idx) => (
            <span key={idx} className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
              #{tag}
            </span>
          ))}
        </div>

        {/* Question Footer Bar: Author + Upvote */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-[#1557A6] text-white flex items-center justify-center font-bold text-xs shrink-0">
              {doubt.author_avatar ? (
                <img src={doubt.author_avatar} alt={doubt.author_name} className="w-full h-full object-cover" />
              ) : (
                doubt.author_name.charAt(0)
              )}
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">{doubt.author_name}</h4>
              <p className="text-[11px] text-slate-500">{doubt.author_college}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Question Upvote button */}
            <button
              onClick={() => toggleDoubtVote(doubt.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                voted
                  ? 'bg-[#EAF4FF] text-[#1557A6] border border-blue-200'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <ArrowBigUp className={`w-4 h-4 ${voted ? 'fill-current' : ''}`} />
              <span>Upvote ({doubt.upvotes_count})</span>
            </button>

            <span className="flex items-center gap-1 text-xs text-slate-500 font-mono">
              <Eye className="w-3.5 h-3.5" />
              <span>{doubt.views_count} views</span>
            </span>
          </div>
        </div>
      </div>

      {/* Answers Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#0B2A5B]">
            Peer Answers ({doubtAnswers.length})
          </h2>
          <span className="text-xs text-slate-500">
            {doubtAnswers.some(a => a.is_accepted) ? '✓ Solution verified' : 'Seeking solution'}
          </span>
        </div>

        {/* Answers List */}
        {doubtAnswers.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-2">
            <p className="text-sm font-bold text-slate-800">No answers posted yet</p>
            <p className="text-xs text-slate-500">
              Be the first classmate or peer to write a solution below!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {doubtAnswers.map(ans => (
              <AnswerCard
                key={ans.id}
                answer={ans}
                isDoubtAuthor={isDoubtAuthor}
                doubtId={doubt.id}
              />
            ))}
          </div>
        )}

        {/* Answer Input Box Form */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">
            Write Your Answer
          </h3>

          {errorMessage && (
            <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
              {errorMessage}
            </p>
          )}

          <form onSubmit={handlePostAnswer} className="space-y-3">
            <textarea
              value={newAnswerText}
              onChange={(e) => setNewAnswerText(e.target.value)}
              rows={5}
              placeholder="Write your step-by-step academic explanation, formula derivation, or counterexample..."
              className="w-full text-xs sm:text-sm p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1557A6] focus:bg-white text-slate-800 placeholder-slate-400"
            />

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-400">
                Format your code or points clearly to help other students learn.
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#1557A6] hover:bg-[#0B2A5B] disabled:opacity-50 rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Posting...' : 'Post Answer'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Report Modal */}
      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        targetId={doubt.id}
        targetType="doubt"
        targetTitle={doubt.title}
      />
    </div>
  );
};
