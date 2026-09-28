import React from 'react';
import {
  UploadCloud,
  HelpCircle,
  Users2,
  BookmarkCheck,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  Search,
  MessageSquare,
  GraduationCap,
  Code2,
  Binary,
  Database,
  Network,
  Cpu,
  Layers,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { MaterialCard } from '../components/MaterialCard';
import { DoubtCard } from '../components/DoubtCard';
import heroIllustration from '../assets/images/studyhub_hero_illustration_1790571731017.jpg';

interface HomeProps {
  navigate: (path: string) => void;
}

const SUBJECT_CATEGORIES = [
  { name: 'Programming & DSA', icon: Code2, count: '140+ resources', desc: 'Algorithms, Data Structures & Problem Solving' },
  { name: 'Mathematics & Stats', icon: Binary, count: '95+ resources', desc: 'Discrete Math, Calculus, Probability' },
  { name: 'Database Systems (DBMS)', icon: Database, count: '80+ resources', desc: 'SQL, Normalization, Query Optimization' },
  { name: 'Computer Networks', icon: Network, count: '75+ resources', desc: 'OSI Model, TCP/IP, Protocols' },
  { name: 'Operating Systems', icon: Cpu, count: '65+ resources', desc: 'Process Scheduling, Memory Management' },
  { name: 'AI & Machine Learning', icon: Layers, count: '50+ resources', desc: 'Neural Nets, Model Training, Scikit' },
];

export const Home: React.FC<HomeProps> = ({ navigate }) => {
  const { materials, doubts, answers } = useData();

  const featuredMaterials = materials.slice(0, 3);
  const recentDoubts = doubts.slice(0, 3);

  return (
    <div className="space-y-16 pb-20">
      {/* =========================================================================
          HERO SECTION (Large blue hero with wave transition and educational visual)
          ========================================================================= */}
      <section className="relative bg-gradient-to-b from-[#0B2A5B] to-[#1557A6] text-white pt-14 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle geometric academic background patterns (blue/cyan only) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-[#18B7C9] blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#2878D4] blur-3xl"></div>
        </div>

        {/* Floating subtle academic elements */}
        <div className="hidden lg:block absolute top-12 right-1/3 opacity-20 pointer-events-none">
          <GraduationCap className="w-16 h-16 text-sky-200" />
        </div>
        <div className="hidden lg:block absolute bottom-24 left-1/4 opacity-15 pointer-events-none">
          <BookOpen className="w-12 h-12 text-[#18B7C9]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold tracking-widest text-[#18B7C9] uppercase">
                <span>Learn</span>
                <span>•</span>
                <span>Share</span>
                <span>•</span>
                <span>Help</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Learn Together.<br />
                Share Knowledge.<br />
                <span className="text-[#18B7C9]">Solve Doubts.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 max-w-xl leading-relaxed font-normal">
                StudyHub is the academic portal for college students to share notes, find previous university exam papers, and receive verified peer answers.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={() => navigate('/materials')}
                  className="px-6 py-3.5 text-sm font-bold text-[#0B2A5B] bg-white hover:bg-slate-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer active:scale-98"
                >
                  <BookOpen className="w-4 h-4 text-[#1557A6]" />
                  <span>Explore Study Materials</span>
                </button>

                <button
                  onClick={() => navigate('/ask-doubt')}
                  className="px-6 py-3.5 text-sm font-bold text-white bg-[#18B7C9] hover:bg-[#1557A6] rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer active:scale-98"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Ask a Doubt</span>
                </button>
              </div>

              {/* Trust markers */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-sky-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#18B7C9]" />
                  <span>Peer Verified Solutions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#18B7C9]" />
                  <span>Free Academic Exchange</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#18B7C9]" />
                  <span>Verified Student Community</span>
                </div>
              </div>
            </div>

            {/* Right Educational Illustration Area */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-white/5 backdrop-blur-xs p-2">
                <img
                  src={heroIllustration}
                  alt="Students studying collaboratively with books and digital devices"
                  className="w-full h-auto rounded-xl object-cover shadow-sm"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="h-80 w-full rounded-xl bg-gradient-to-br from-[#1557A6] to-[#0B2A5B] p-6 flex flex-col justify-between text-white border border-white/10">
                          <div class="flex justify-between items-center">
                            <span class="text-xs font-bold text-sky-300">STUDYHUB ACADEMIC PORTAL</span>
                            <span class="text-xs bg-white/20 px-2 py-0.5 rounded">Semester 2026</span>
                          </div>
                          <div class="space-y-2">
                            <h3 class="text-xl font-bold">Collaborative Student Learning</h3>
                            <p class="text-xs text-slate-200">Lecture notes, past exams, and peer doubt solutions exchanged daily across top universities.</p>
                          </div>
                          <div class="flex gap-2">
                            <span class="text-xs bg-white/20 px-2.5 py-1 rounded-lg">#DSA</span>
                            <span class="text-xs bg-white/20 px-2.5 py-1 rounded-lg">#OperatingSystems</span>
                            <span class="text-xs bg-white/20 px-2.5 py-1 rounded-lg">#DBMS</span>
                          </div>
                        </div>
                      `;
                    }
                  }}
                />

                {/* Floating academic mini-badge */}
                <div className="absolute -bottom-3 -left-3 bg-white text-slate-900 rounded-xl p-3 shadow-lg border border-slate-100 hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#EAF4FF] text-[#1557A6] flex items-center justify-center font-bold">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0B2A5B]">Active Academic Portal</p>
                    <p className="text-[11px] text-[#6B7280]">Verified Student Resources</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Curved / Wave Transition to light content area below */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg
            className="relative block w-full h-12 text-[#F5F8FC]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C150,90 400,120 600,60 C800,0 1050,90 1200,40 L1200,120 L0,120 Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </section>

      {/* =========================================================================
          QUICK ACTION / HIGHLIGHT CARDS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Share Study Materials */}
          <div
            onClick={() => navigate('/upload')}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-[#1557A6]/40 hover:-translate-y-1 transition-all duration-200 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-[#EAF4FF] text-[#1557A6] flex items-center justify-center mb-4 group-hover:bg-[#1557A6] group-hover:text-white transition-colors">
              <UploadCloud className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5 flex items-center justify-between">
              <span>Share Materials</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#1557A6] transition-colors" />
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upload useful lecture notes, PDFs, presentations, and resources with your classmates.
            </p>
          </div>

          {/* Card 2: Ask a Doubt */}
          <div
            onClick={() => navigate('/ask-doubt')}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-[#1557A6]/40 hover:-translate-y-1 transition-all duration-200 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-[#EAF4FF] text-[#1557A6] flex items-center justify-center mb-4 group-hover:bg-[#1557A6] group-hover:text-white transition-colors">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5 flex items-center justify-between">
              <span>Ask a Doubt</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#1557A6] transition-colors" />
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Post questions and receive step-by-step explanations from students who mastered the topic.
            </p>
          </div>

          {/* Card 3: Help Your Peers */}
          <div
            onClick={() => navigate('/doubts?status=Unanswered')}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-[#1557A6]/40 hover:-translate-y-1 transition-all duration-200 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-[#EAF4FF] text-[#1557A6] flex items-center justify-center mb-4 group-hover:bg-[#1557A6] group-hover:text-white transition-colors">
              <Users2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5 flex items-center justify-between">
              <span>Help Your Peers</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#1557A6] transition-colors" />
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Answer questions, earn helpful upvotes, and build your recognized academic score.
            </p>
          </div>

          {/* Card 4: Save & Organize */}
          <div
            onClick={() => navigate('/saved')}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-[#1557A6]/40 hover:-translate-y-1 transition-all duration-200 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-[#EAF4FF] text-[#1557A6] flex items-center justify-center mb-4 group-hover:bg-[#1557A6] group-hover:text-white transition-colors">
              <BookmarkCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5 flex items-center justify-between">
              <span>Save & Organize</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#1557A6] transition-colors" />
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bookmark essential study materials, exam formulas, and solutions to review before tests.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SUBJECT CATEGORIES (Browse by Subject)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0B2A5B] tracking-tight">
              Browse by Subject
            </h2>
            <p className="text-xs text-[#6B7280] mt-1 font-medium">
              Find course notes, exam papers, and doubts organized by core academic disciplines.
            </p>
          </div>
          <button
            onClick={() => navigate('/materials')}
            className="text-xs font-bold text-[#1557A6] hover:underline flex items-center gap-1"
          >
            <span>All Subjects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SUBJECT_CATEGORIES.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={idx}
                onClick={() => navigate(`/materials?q=${encodeURIComponent(cat.name.split(' ')[0])}`)}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-[#1557A6]/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-start gap-4 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EAF4FF] text-[#1557A6] group-hover:bg-[#1557A6] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#1557A6] transition-colors truncate">
                      {cat.name}
                    </h3>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-1 line-clamp-1">
                    {cat.desc}
                  </p>
                  <span className="inline-block text-[11px] font-semibold text-[#18B7C9] mt-2">
                    {cat.count}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          EXPLORE STUDY MATERIALS SECTION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0B2A5B] tracking-tight">
              Popular Study Materials
            </h2>
            <p className="text-xs text-[#6B7280] mt-1 font-medium">
              Handwritten lecture notes, university exam solutions, and lab guides shared by students.
            </p>
          </div>

          <button
            onClick={() => navigate('/materials')}
            className="flex items-center gap-1.5 text-xs font-bold text-[#1557A6] hover:underline"
          >
            <span>View All Materials ({materials.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredMaterials.map(mat => (
            <MaterialCard
              key={mat.id}
              material={mat}
              onView={(id) => navigate(`/materials/${id}`)}
            />
          ))}
        </div>
      </section>

      {/* =========================================================================
          RECENT DOUBTS SECTION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0B2A5B] tracking-tight">
              Peer Doubt Board
            </h2>
            <p className="text-xs text-[#6B7280] mt-1 font-medium">
              Questions from students needing clear step-by-step guidance and counterexamples.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/ask-doubt')}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-[#1557A6] hover:bg-[#0B2A5B] rounded-lg transition-colors cursor-pointer"
            >
              + Ask a Doubt
            </button>
            <button
              onClick={() => navigate('/doubts')}
              className="flex items-center gap-1.5 text-xs font-bold text-[#1557A6] hover:underline cursor-pointer"
            >
              <span>View Board</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentDoubts.map(doubt => {
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

      {/* =========================================================================
          HOW STUDYHUB WORKS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1557A6]">
              Simple 4-Step Flow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2A5B] tracking-tight mt-1">
              How StudyHub Works
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-2">
              An open, peer-driven ecosystem built to make college exam prep straightforward and reliable.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#EAF4FF] text-[#1557A6] font-bold text-lg flex items-center justify-center mx-auto border border-blue-200">
                1
              </div>
              <h3 className="text-sm font-bold text-slate-900">Explore & Discover</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Filter by course, semester, or subject to find lecture notes and past question papers.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#EAF4FF] text-[#1557A6] font-bold text-lg flex items-center justify-center mx-auto border border-blue-200">
                2
              </div>
              <h3 className="text-sm font-bold text-slate-900">Ask Academic Doubts</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Stuck on a problem or proof? Post your doubt with tags for peer assistance.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#EAF4FF] text-[#1557A6] font-bold text-lg flex items-center justify-center mx-auto border border-blue-200">
                3
              </div>
              <h3 className="text-sm font-bold text-slate-900">Receive Solutions</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Review peer answers, upvote the most helpful ones, and accept the best solution.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#EAF4FF] text-[#1557A6] font-bold text-lg flex items-center justify-center mx-auto border border-blue-200">
                4
              </div>
              <h3 className="text-sm font-bold text-slate-900">Contribute & Grow</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Upload your semester notes, help fellow students, and build your academic score.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          COMMUNITY INVITATION BANNER
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0B2A5B] to-[#1557A6] rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#18B7C9]">
              StudyHub Community
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              "Knowledge becomes more useful when shared."
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              Have lecture notes from your classes or solved past question papers? Upload them to help juniors and peers across colleges.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/upload')}
                className="px-5 py-2.5 text-xs font-bold text-[#0B2A5B] bg-white hover:bg-slate-100 rounded-xl transition-colors shadow-sm cursor-pointer"
              >
                Share Your Knowledge
              </button>
              <button
                onClick={() => navigate('/community')}
                className="px-5 py-2.5 text-xs font-bold text-white bg-white/20 hover:bg-white/30 rounded-xl transition-colors cursor-pointer"
              >
                View Community Leaderboard
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

