import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { useData } from '../context/DataContext';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetId: string;
  targetType: 'material' | 'doubt' | 'answer';
  targetTitle: string;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  targetId,
  targetType,
  targetTitle
}) => {
  const { submitReport } = useData();
  const [reason, setReason] = useState('Inaccurate or misleading academic content');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReport(targetId, targetType, targetTitle, reason, details);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>Report Content to Academic Moderators</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-4 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-medium text-center">
            Thank you. Your report has been submitted to the StudyHub Academic Moderator Board for review.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Content
              </label>
              <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200 font-mono truncate">
                {targetTitle}
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Reason for Reporting
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1557A6]"
              >
                <option value="Inaccurate or misleading academic content">Inaccurate or misleading academic content</option>
                <option value="Copyright violation or unauthorized materials">Copyright violation or unauthorized materials</option>
                <option value="Spam, advertising, or inappropriate comments">Spam, advertising, or inappropriate comments</option>
                <option value="Offensive or abusive language">Offensive or abusive language</option>
                <option value="Other academic honor code breach">Other academic honor code breach</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Additional Details (Optional)
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={3}
                placeholder="Help us understand the issue..."
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1557A6]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold text-white bg-[#D64545] hover:bg-red-700 rounded-lg"
              >
                Submit Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
