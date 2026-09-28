import React from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { DoubtCard } from '../components/DoubtCard';
import { MaterialCard } from '../components/MaterialCard';
import { Users, Award, BookOpen, MessageSquare, ArrowUpRight, Flame } from 'lucide-react';

interface CommunityProps {
  navigate: (path: string) => void;
}

export const Community: React.FC<CommunityProps> = ({ navigate }) => {
  const { allUsers } = useAuth();
  const { materials, doubts, answers } = useData();

  // Calculate real leaderboard rankings from database records
  const userRankings = allUsers.map(user => {
    const userMats = materials.filter(m => m.uploader_id === user.id);
    const userAnswers = answers.filter(a => a.author_id === user.id);
    const userDoubts = doubts.filter(d => d.author_id === user.id);

    const totalUpvotes = userAnswers.reduce((acc, a) => acc + a.upvotes_count, 0) +
      userDoubts.reduce((acc, d) => acc + d.upvotes_count, 0);

    const acceptedSolutions = userAnswers.filter(a => a.is_accepted).length;

    // Academic score formula
    const academicScore = (userMats.length * 15) + (acceptedSolutions * 25) + (totalUpvotes * 2);

    return {
      user,
      materialsCount: userMats.length,
      answersCount: userAnswers.length,
      acceptedSolutions,
      totalUpvotes,
      score: academicScore
    };
  }).sort((a, b) => b.score - a.score);

  // Popular Doubts (highest views or upvotes)
  const popularDoubts = [...doubts].sort((a, b) => b.upvotes_count - a.upvotes_count).slice(0, 3);

  // Most Downloaded Materials
  const topMaterials = [...materials].sort((a, b) => b.downloads_count - a.downloads_count).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#0B2A5B] to-[#1557A6] rounded-2xl p-8 text-white shadow-md">
        <span className="text-xs font-bold uppercase tracking-widest text-[#18B7C9]">
          Student Network
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
          StudyHub Student Community
        </h1>
        <p className="text-xs sm:text-sm text-slate-200 mt-2 max-w-2xl leading-relaxed">
          Celebrating top academic contributors who share notes, verify complex derivations, and assist peers every semester.
        </p>
      </div>

      {/* Top Contributors Leaderboard (Calculated from actual database data) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-extrabold text-[#0B2A5B]">
              Top Academic Contributors
            </h2>
          </div>
          <span className="text-xs text-slate-500">Live Semester Leaderboard</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {userRankings.map((rank, idx) => (
            <div
              key={rank.user.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs relative overflow-hidden flex flex-col justify-between"
            >
              {/* Rank Badge */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#1557A6] text-white flex items-center justify-center font-bold text-base shrink-0">
                    {rank.user.avatar_url ? (
                      <img src={rank.user.avatar_url} alt={rank.user.full_name} className="w-full h-full object-cover" />
                    ) : (
                      rank.user.full_name.charAt(0)
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">
                      {rank.user.full_name}
                    </h3>
                    <p className="text-[11px] text-slate-500 truncate max-w-[150px]">
                      {rank.user.college}
                    </p>
                    <p className="text-[10px] text-[#1557A6] font-semibold">
                      {rank.user.course}
                    </p>
                  </div>
                </div>

                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold font-mono ${
                  idx === 0
                    ? 'bg-amber-100 text-amber-800'
                    : idx === 1
                    ? 'bg-slate-200 text-slate-700'
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  #{idx + 1}
                </div>
              </div>

              {/* Contributor Stats */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-center font-mono">
                <div>
                  <span className="text-xs font-bold text-slate-900 tabular-nums">
                    {rank.materialsCount}
                  </span>
                  <p className="text-[10px] text-slate-400 font-sans">Notes</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 tabular-nums">
                    {rank.acceptedSolutions}
                  </span>
                  <p className="text-[10px] text-slate-400 font-sans">Accepted</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-[#1557A6] tabular-nums">
                    {rank.score}
                  </span>
                  <p className="text-[10px] text-slate-400 font-sans">Points</p>
                </div>
              </div>

              <div className="pt-3 flex justify-between items-center text-xs">
                <span className="text-slate-500 text-[11px]">
                  {rank.totalUpvotes} helpful upvotes
                </span>
                <button
                  onClick={() => navigate('/doubts')}
                  className="text-[#1557A6] font-semibold hover:underline"
                >
                  View Activity →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Doubts Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-extrabold text-[#0B2A5B]">
              Trending Discussions & Doubts
            </h2>
          </div>
          <button
            onClick={() => navigate('/doubts')}
            className="text-xs font-bold text-[#1557A6] hover:underline"
          >
            View all doubts →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularDoubts.map(doubt => {
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
      </section>

      {/* Top Downloaded Study Materials */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#1557A6]" />
            <h2 className="text-xl font-extrabold text-[#0B2A5B]">
              Most Downloaded Resources
            </h2>
          </div>
          <button
            onClick={() => navigate('/materials?sort=downloads')}
            className="text-xs font-bold text-[#1557A6] hover:underline"
          >
            View all resources →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topMaterials.map(mat => (
            <MaterialCard
              key={mat.id}
              material={mat}
              onView={(id) => navigate(`/materials/${id}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
