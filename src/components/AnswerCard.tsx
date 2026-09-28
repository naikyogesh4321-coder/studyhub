import React, { useState } from 'react';
import { Answer } from '../types';
import {
  ArrowBigUp,
  CheckCircle,
  MessageCircle,
  Edit2,
  Trash2,
  Send,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';

interface AnswerCardProps {
  answer: Answer;
  isDoubtAuthor: boolean;
  doubtId: string;
}

export const AnswerCard: React.FC<AnswerCardProps> = ({
  answer,
  isDoubtAuthor,
  doubtId
}) => {
  const { user } = useAuth();
  const {
    toggleAnswerVote,
    hasUserVotedAnswer,
    markBestAnswer,
    editAnswer,
    deleteAnswer,
    postReply
  } = useData();
  const { showToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(answer.content);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState('');

  const voted = hasUserVotedAnswer(answer.id);
  const isOwnAnswer = user?.id === answer.author_id;

  const handleSaveEdit = async () => {
    if (editedContent.trim()) {
      await editAnswer(answer.id, editedContent);
      setIsEditing(false);
      showToast('Answer updated successfully', 'success');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this answer?')) {
      await deleteAnswer(answer.id);
      showToast('Answer deleted', 'info');
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyText.trim()) {
      postReply(answer.id, replyText);
      setReplyText('');
      setShowReplyBox(false);
      showToast('Follow-up reply posted!', 'success');
    }
  };

  const handleVote = () => {
    toggleAnswerVote(answer.id);
    if (!voted) {
      showToast('Marked answer as helpful!', 'success');
    }
  };

  const handleMarkAccepted = () => {
    markBestAnswer(doubtId, answer.id);
    if (answer.is_accepted) {
      showToast('Unmarked accepted solution', 'info');
    } else {
      showToast('Accepted this solution as Best Answer! 🎉', 'success');
    }
  };

  return (
    <div
      className={`bg-white rounded-xl border transition-all duration-200 p-5 ${
        answer.is_accepted
          ? 'border-emerald-300 ring-2 ring-emerald-100 shadow-sm'
          : 'border-slate-200 shadow-xs hover:border-slate-300'
      }`}
    >
      {/* Accepted Answer Banner */}
      {answer.is_accepted && (
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E9E62] bg-emerald-50 px-3 py-1.5 rounded-lg mb-4 w-fit border border-emerald-200 shadow-2xs">
          <CheckCircle className="w-4 h-4 fill-emerald-100" />
          <span>✓ Accepted Solution by Question Author</span>
        </div>
      )}

      {/* Header: Author + Timestamp + Actions */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-[#1557A6] to-[#0B2A5B] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
            {answer.author_avatar ? (
              <img src={answer.author_avatar} alt={answer.author_name} className="w-full h-full object-cover" />
            ) : (
              answer.author_name.charAt(0)
            )}
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
              {answer.author_name}
            </h4>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
              <span>{answer.author_college || 'Student'}</span>
              <span>·</span>
              <span>{new Date(answer.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Right Action Icons: Edit/Delete for owner */}
        <div className="flex items-center gap-1.5">
          {isOwnAnswer && !isEditing && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                title="Edit answer"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleDelete}
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                title="Delete answer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          {/* Mark Best Answer button (strictly for question author) */}
          {isDoubtAuthor && (
            <button
              onClick={handleMarkAccepted}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 shadow-2xs ${
                answer.is_accepted
                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                  : 'bg-[#EAF4FF] text-[#1557A6] hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{answer.is_accepted ? 'Accepted Answer' : 'Mark as Best Answer'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Answer Body */}
      {isEditing ? (
        <div className="space-y-3 mb-4">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows={4}
            className="w-full text-xs sm:text-sm p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1557A6]"
          />
          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedContent(answer.content);
              }}
              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#1557A6] rounded-lg hover:bg-[#0B2A5B]"
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line mb-4 font-normal">
          {answer.content}
        </div>
      )}

      {/* Bottom Bar: Upvote & Reply triggers */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="flex items-center gap-3">
          {/* Upvote button */}
          <button
            onClick={handleVote}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              voted
                ? 'bg-[#EAF4FF] text-[#1557A6] border border-blue-200 shadow-2xs'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ArrowBigUp className={`w-4 h-4 transition-transform active:scale-125 ${voted ? 'fill-current' : ''}`} />
            <span>Helpful ({answer.upvotes_count})</span>
          </button>

          {/* Reply Toggle */}
          <button
            onClick={() => setShowReplyBox(!showReplyBox)}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-slate-500" />
            <span>Reply {answer.replies && answer.replies.length > 0 ? `(${answer.replies.length})` : ''}</span>
          </button>
        </div>
      </div>

      {/* Reply input form */}
      {showReplyBox && (
        <form onSubmit={handleSendReply} className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a quick follow-up reply..."
            className="flex-1 text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1557A6] focus:bg-white"
          />
          <button
            type="submit"
            className="px-3.5 py-2 text-xs font-semibold text-white bg-[#1557A6] hover:bg-[#0B2A5B] rounded-lg transition-colors flex items-center gap-1 shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </form>
      )}

      {/* Replies Thread */}
      {answer.replies && answer.replies.length > 0 && (
        <div className="mt-3 pl-4 border-l-2 border-slate-200 space-y-2.5 pt-2">
          {answer.replies.map(reply => (
            <div key={reply.id} className="text-xs text-slate-700 bg-slate-50/90 p-3 rounded-lg border border-slate-100">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-semibold text-slate-900">{reply.author_name}</span>
                <span className="text-[10px] text-slate-400">
                  {new Date(reply.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="leading-relaxed">{reply.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

