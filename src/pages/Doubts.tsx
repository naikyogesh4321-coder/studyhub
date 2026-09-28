import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { DoubtCard } from '../components/DoubtCard';
import { EmptyState } from '../components/EmptyState';
import { HelpCircle, Search, PlusCircle, CheckCircle2, Clock } from 'lucide-react';

interface DoubtsProps {
  navigate: (path: string) => void;
  initialStatus?: string;
}

export const Doubts: React.FC<DoubtsProps> = ({ navigate, initialStatus = '' }) => {
  const { doubts, answers } = useData();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Answered' | 'Unanswered'>(
    (initialStatus as any) || 'All'
  );
  const [subjectFilter, setSubjectFilter] = useState('');

  // Extract unique subjects
  const availableSubjects = useMemo(() => {
    const set = new Set<string>();
    doubts.forEach(d => {
      if (d.subject) set.add(d.subject);
    });
    return Array.from(set);
  }, [doubts]);

  const filteredDoubts = useMemo(() => {
    return doubts.filter(d => {
      if (statusFilter !== 'All' && d.status !== statusFilter) return false;
      if (subjectFilter && d.subject !== subjectFilter) return false;

      const q = search.trim().toLowerCase();
      if (q) {
        const matchTitle = d.title.toLowerCase().includes(q);
        const matchDesc = d.description.toLowerCase().includes(q);
        const matchSubject = d.subject.toLowerCase().includes(q);
        const matchAuthor = d.author_name.toLowerCase().includes(q);
        const matchTags = d.tags.some(t => t.toLowerCase().includes(q));

        if (!matchTitle && !matchDesc && !matchSubject && !matchAuthor && !matchTags) {
          return false;
        }
      }
      return true;
    });
  }, [doubts, search, statusFilter, subjectFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Doubt Board Hero Banner */}
      <div className="bg-gradient-to-r from-[#0B2A5B] to-[#1557A6] rounded-2xl p-6 sm:p-10 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#18B7C9]">
            Peer Doubt Solving
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Have a question?<br />
            Ask your peers.
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 max-w-lg font-normal">
            Stuck on a tricky algorithm, database query, or OS concept? Ask fellow students and receive detailed, verified solutions.
          </p>
        </div>

        <button
          onClick={() => navigate('/ask-doubt')}
          className="px-6 py-3 text-xs sm:text-sm font-bold text-[#0B2A5B] bg-white hover:bg-slate-100 rounded-xl shadow-md transition-all duration-200 flex items-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-[#1557A6]" />
          <span>+ Ask a Doubt</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full lg:w-96">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions by concept, subject, tag..."
            className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1557A6] focus:bg-white text-slate-800 transition-colors"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 p-0.5 text-xs"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>


        {/* Status Tabs and Subject Filter */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
          {/* Status Tabs (Segmented control) */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            {(['All', 'Answered', 'Unanswered'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  statusFilter === tab
                    ? 'bg-white text-[#1557A6] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Subject Dropdown */}
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1557A6] text-slate-800 font-medium"
          >
            <option value="">All Subjects</option>
            {availableSubjects.map(sub => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Doubt Cards Grid */}
      <div>
        <div className="text-xs text-slate-500 mb-4 px-1">
          Showing <span className="font-semibold text-slate-900 tabular-nums">{filteredDoubts.length}</span> questions
        </div>

        {filteredDoubts.length === 0 ? (
          <EmptyState
            icon={HelpCircle}
            title="No questions have been posted yet"
            description="You can be the first to ask! Post your academic doubt and let peers explain."
            actionText="+ Ask a Doubt Now"
            onAction={() => navigate('/ask-doubt')}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoubts.map(doubt => {
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
    </div>
  );
};
