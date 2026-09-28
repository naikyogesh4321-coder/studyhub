import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { MaterialCard } from '../components/MaterialCard';
import { DoubtCard } from '../components/DoubtCard';
import {
  UploadCloud,
  HelpCircle,
  MessageSquare,
  ThumbsUp,
  Bookmark,
  ArrowRight,
  Sparkles,
  BookOpen,
  Calendar,
  CheckCircle2
} from 'lucide-react';

interface DashboardProps {
  navigate: (path: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ navigate }) => {
  const { user } = useAuth();
  const { materials, doubts, answers, bookmarks } = useData();

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Please Sign In</h2>
        <p className="text-xs text-slate-500">You must be logged in to view your student dashboard.</p>
        <button
          onClick={() => navigate('/login')}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#1557A6] rounded-lg"
        >
          Sign In
        </button>
      </div>
    );
  }

  // Greeting based on time
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  // Real database statistics for this user
  const userMaterials = materials.filter(m => m.uploader_id === user.id);
  const userDoubts = doubts.filter(d => d.author_id === user.id);
  const userAnswers = answers.filter(a => a.author_id === user.id);

  const totalHelpfulVotes = userAnswers.reduce((sum, a) => sum + a.upvotes_count, 0) +
    userDoubts.reduce((sum, d) => sum + d.upvotes_count, 0);

  // Recommendations: materials matching user's course or semester
  const recommendedMaterials = materials
    .filter(m => m.course === user.course || m.semester === user.semester)
    .slice(0, 3);

  // Unanswered or recent doubts from the community
  const pendingDoubts = doubts.slice(0, 3);

  // Derive Real Recent Activity
  const activityList = [
    ...userMaterials.map(m => ({
      id: m.id,
      type: 'material',
      text: `You uploaded "${m.title}"`,
      date: m.created_at,
      link: `/materials/${m.id}`
    })),
    ...userDoubts.map(d => ({
      id: d.id,
      type: 'doubt',
      text: `You asked "${d.title}"`,
      date: d.created_at,
      link: `/doubts/${d.id}`
    })),
    ...userAnswers.map(a => ({
      id: a.id,
      type: 'answer',
      text: `You posted an answer to a question in ${a.doubt_id}`,
      date: a.created_at,
      link: `/doubts/${a.doubt_id}`
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0B2A5B] to-[#1557A6] rounded-2xl p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-[#18B7C9] uppercase tracking-wider">
            {user.college} · {user.course}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            {greeting}, {user.full_name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 mt-1">
            Continue learning and help your peers.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate('/upload')}
            className="px-4 py-2.5 text-xs font-bold text-[#0B2A5B] bg-white hover:bg-slate-100 rounded-xl transition-colors shadow-xs"
          >
            + Upload Notes
          </button>
          <button
            onClick={() => navigate('/ask-doubt')}
            className="px-4 py-2.5 text-xs font-bold text-white bg-[#18B7C9] hover:bg-sky-500 rounded-xl transition-colors shadow-xs"
          >
            Ask Doubt
          </button>
        </div>
      </div>

      {/* Real Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Materials Uploaded */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-[#1557A6]/30 transition-all duration-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold text-[#6B7280]">Materials Uploaded</span>
            <div className="w-8 h-8 rounded-lg bg-[#EAF4FF] text-[#1557A6] flex items-center justify-center">
              <UploadCloud className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0B2A5B] tabular-nums font-mono">
            {userMaterials.length}
          </div>
          <button
            onClick={() => navigate('/my-materials')}
            className="text-[11px] text-[#1557A6] hover:underline font-semibold mt-2 block cursor-pointer"
          >
            Manage uploads →
          </button>
        </div>

        {/* Doubts Asked */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-[#1557A6]/30 transition-all duration-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold text-[#6B7280]">Doubts Asked</span>
            <div className="w-8 h-8 rounded-lg bg-[#EAF4FF] text-[#1557A6] flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0B2A5B] tabular-nums font-mono">
            {userDoubts.length}
          </div>
          <button
            onClick={() => navigate('/my-doubts')}
            className="text-[11px] text-[#1557A6] hover:underline font-semibold mt-2 block cursor-pointer"
          >
            View discussions →
          </button>
        </div>

        {/* Answers Posted */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-[#1E9E62]/30 transition-all duration-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold text-[#6B7280]">Answers Posted</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#1E9E62] flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0B2A5B] tabular-nums font-mono">
            {userAnswers.length}
          </div>
          <button
            onClick={() => navigate('/my-answers')}
            className="text-[11px] text-[#1557A6] hover:underline font-semibold mt-2 block cursor-pointer"
          >
            Review solutions →
          </button>
        </div>

        {/* Helpful Votes Received */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-amber-300 transition-all duration-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold text-[#6B7280]">Helpful Votes</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#B26A00] flex items-center justify-center">
              <ThumbsUp className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0B2A5B] tabular-nums font-mono">
            {totalHelpfulVotes}
          </div>
          <span className="text-[11px] text-slate-400 mt-2 block font-medium">
            Academic karma score
          </span>
        </div>
      </div>


      {/* Two Column Layout: Recent Activity + Recommended Materials */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Recent Activity Feed */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#0B2A5B]">
            Recent Learning Activity
          </h2>

          {activityList.length === 0 ? (
            <div className="text-xs text-slate-500 py-6 text-center">
              No recent activity yet. Upload notes or ask a doubt to start building your academic profile!
            </div>
          ) : (
            <div className="space-y-3">
              {activityList.map((act, i) => (
                <div
                  key={i}
                  onClick={() => navigate(act.link)}
                  className="p-3 rounded-lg bg-slate-50 hover:bg-[#EAF4FF]/40 border border-slate-100 cursor-pointer transition-colors"
                >
                  <p className="text-xs font-semibold text-slate-900 leading-snug">
                    {act.text}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    {new Date(act.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => navigate('/saved')}
              className="w-full py-2 text-xs font-semibold text-[#1557A6] bg-[#EAF4FF] hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>View Saved Bookmarks ({bookmarks.length})</span>
            </button>
          </div>
        </div>

        {/* Right Column: Recommended Study Materials */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#0B2A5B]">
              Recommended for {user.course}
            </h2>
            <button
              onClick={() => navigate('/materials')}
              className="text-xs font-semibold text-[#1557A6] hover:underline"
            >
              View all →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recommendedMaterials.map(mat => (
              <MaterialCard
                key={mat.id}
                material={mat}
                onView={(id) => navigate(`/materials/${id}`)}
              />
            ))}
          </div>

          {/* Doubts Needing Peer Solutions */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#0B2A5B]">
                Doubts Waiting for Peer Solutions
              </h2>
              <button
                onClick={() => navigate('/doubts?status=Unanswered')}
                className="text-xs font-semibold text-[#1557A6] hover:underline"
              >
                Help Peers →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pendingDoubts.map(d => {
                const count = answers.filter(a => a.doubt_id === d.id).length;
                return (
                  <DoubtCard
                    key={d.id}
                    doubt={d}
                    onView={(id) => navigate(`/doubts/${id}`)}
                    answerCount={count}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
