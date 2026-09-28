import React from 'react';
import { GraduationCap, ShieldCheck, Mail, Heart } from 'lucide-react';
import studyHubLogo from '../assets/images/studyhub_circular_logo_1790574012647.jpg';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="bg-[#0B2A5B] text-white border-t border-[#1557A6]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand & Purpose */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <img
                src={studyHubLogo}
                alt="StudyHub – Empowering Education Worldwide"
                className="w-10 h-10 rounded-full object-contain bg-white p-0.5 shadow-xs shrink-0"
              />
              <span className="text-xl font-extrabold tracking-tight text-white">
                Study<span className="text-[#18B7C9]">Hub</span>
              </span>
            </div>
            <p className="text-xs text-sky-200 font-semibold mb-3">
              "Empowering Education Worldwide"
            </p>

            <p className="text-[11px] text-slate-300 leading-relaxed mb-4">
              The collaborative academic portal built for university students to exchange lecture notes, past exam papers, and peer-verified solutions.
            </p>
            {/* Social / Trust Badges */}
            <div className="flex items-center gap-2 text-xs text-slate-300 pt-1">
              <div className="px-2.5 py-1 bg-white/10 rounded-md text-[10px] font-semibold text-sky-200 border border-white/10">
                100% Free Access
              </div>
              <div className="px-2.5 py-1 bg-white/10 rounded-md text-[10px] font-semibold text-emerald-300 border border-white/10">
                Honor Code Verified
              </div>
            </div>
          </div>


          {/* Col 2: Academic Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-200 mb-3">
              Academic Resources
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => navigate('/materials')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  Study Materials Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/materials?type=Notes')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  Handwritten Lecture Notes
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/materials?type=Question+Papers')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  Past University Exam Papers
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/materials?type=Lab+Manuals')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  Lab Manuals & Code Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/upload')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  Upload Educational Materials
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Peer Learning */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-200 mb-3">
              Peer Learning
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => navigate('/doubts')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  Doubt Board
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/ask-doubt')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  Ask an Academic Doubt
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/community')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  Student Community & Leaderboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/doubts?status=Unanswered')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  Unanswered Doubts (Help Peers)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-200 mb-3">
              Institution & Legal
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Academic Honor Code
                </span>
              </li>
              <li>
                <span className="text-slate-300">Terms of Service</span>
              </li>
              <li>
                <span className="text-slate-300">Student Privacy Policy</span>
              </li>
              <li>
                <span className="text-slate-300">DMCA & Copyright Takedown</span>
              </li>
              <li>
                <span className="text-slate-300">Contact: support@studyhub.edu</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p>© 2026 StudyHub. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-200 cursor-pointer">Privacy</span>
            <span>·</span>
            <span className="hover:text-slate-200 cursor-pointer">Terms</span>
            <span>·</span>
            <span className="hover:text-slate-200 cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
