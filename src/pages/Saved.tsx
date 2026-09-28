import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { MaterialCard } from '../components/MaterialCard';
import { DoubtCard } from '../components/DoubtCard';
import { EmptyState } from '../components/EmptyState';
import { Bookmark, BookOpen, HelpCircle, MessageSquare, ArrowLeft } from 'lucide-react';

interface SavedProps {
  navigate: (path: string) => void;
}

export const Saved: React.FC<SavedProps> = ({ navigate }) => {
  const { user } = useAuth();
  const { bookmarks, materials, doubts, answers, toggleBookmark } = useData();

  const [activeTab, setActiveTab] = useState<'materials' | 'doubts' | 'answers'>('materials');

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Sign in to View Saved Resources</h2>
        <button
          onClick={() => navigate('/login')}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#1557A6] rounded-lg"
        >
          Sign In
        </button>
      </div>
    );
  }

  // Filter bookmarked entities
  const userBookmarks = bookmarks.filter(b => b.user_id === user.id);

  const savedMaterials = materials.filter(m =>
    userBookmarks.some(b => b.target_type === 'material' && b.target_id === m.id)
  );

  const savedDoubts = doubts.filter(d =>
    userBookmarks.some(b => b.target_type === 'doubt' && b.target_id === d.id)
  );

  const savedAnswers = answers.filter(a =>
    userBookmarks.some(b => b.target_type === 'answer' && b.target_id === a.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EAF4FF] text-[#1557A6] flex items-center justify-center">
            <Bookmark className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-[#0B2A5B]">
              Saved Resources
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Quickly revisit bookmarked lecture notes, questions, and verified solutions.
            </p>
          </div>
        </div>

        {/* Tab Controls (Segmented control) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setActiveTab('materials')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'materials'
                ? 'bg-white text-[#1557A6] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Materials ({savedMaterials.length})
          </button>
          <button
            onClick={() => setActiveTab('doubts')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'doubts'
                ? 'bg-white text-[#1557A6] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Doubts ({savedDoubts.length})
          </button>
          <button
            onClick={() => setActiveTab('answers')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'answers'
                ? 'bg-white text-[#1557A6] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Answers ({savedAnswers.length})
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'materials' && (
        <div>
          {savedMaterials.length === 0 ? (
            <EmptyState
              icon={BookOpen}
              title="You haven't saved any materials yet"
              description="Click the bookmark icon on any study material card to save it for quick semester review."
              actionText="Browse Study Materials"
              onAction={() => navigate('/materials')}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedMaterials.map(mat => (
                <MaterialCard
                  key={mat.id}
                  material={mat}
                  onView={(id) => navigate(`/materials/${id}`)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'doubts' && (
        <div>
          {savedDoubts.length === 0 ? (
            <EmptyState
              icon={HelpCircle}
              title="No saved questions yet"
              description="Save questions you want to follow or review before tests."
              actionText="Explore Doubt Board"
              onAction={() => navigate('/doubts')}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedDoubts.map(doubt => {
                const count = answers.filter(a => a.doubt_id === doubt.id).length;
                return (
                  <DoubtCard
                    key={doubt.id}
                    doubt={doubt}
                    onView={(id) => navigate(`/doubts/${id}`)}
                    answerCount={count}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'answers' && (
        <div>
          {savedAnswers.length === 0 ? (
            <EmptyState
              icon={MessageSquare}
              title="No saved answers yet"
              description="Bookmark useful explanations or formulas from discussions to study later."
              actionText="View Doubts"
              onAction={() => navigate('/doubts')}
            />
          ) : (
            <div className="space-y-4 max-w-3xl mx-auto">
              {savedAnswers.map(ans => (
                <div key={ans.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1557A6]">By {ans.author_name}</span>
                    <button
                      onClick={() => toggleBookmark(ans.id, 'answer')}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Remove bookmark
                    </button>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line line-clamp-3">
                    {ans.content}
                  </p>
                  <button
                    onClick={() => navigate(`/doubts/${ans.doubt_id}`)}
                    className="text-xs font-semibold text-[#1557A6] hover:underline"
                  >
                    View in context →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
