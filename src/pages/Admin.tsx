import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import {
  ShieldAlert,
  Users,
  BookOpen,
  HelpCircle,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

interface AdminProps {
  navigate: (path: string) => void;
}

export const Admin: React.FC<AdminProps> = ({ navigate }) => {
  const { user, allUsers } = useAuth();
  const {
    materials,
    doubts,
    answers,
    reports,
    resolveReport,
    deleteMaterial,
    deleteDoubt
  } = useData();

  const [activeTab, setActiveTab] = useState<'reports' | 'materials' | 'doubts' | 'users'>('reports');

  // Verify Admin authorization
  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">Restricted Admin Access</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          You must be signed in with an authorized Academic Moderator / Administrator account to view this section.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#1557A6] rounded-lg"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const pendingReports = reports.filter(r => r.status === 'pending');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest bg-purple-600/40 text-purple-300 px-2.5 py-0.5 rounded border border-purple-500/30">
            StudyHub Administration Console
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            Academic Moderation & Integrity
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review reported materials, enforce copyright/honor codes, and manage academic resources.
          </p>
        </div>

        {/* Global Admin Stats */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="p-3 bg-white/10 rounded-xl text-center">
            <span className="text-lg font-bold text-white tabular-nums">{allUsers.length}</span>
            <p className="text-[10px] text-slate-400 font-sans">Students</p>
          </div>
          <div className="p-3 bg-white/10 rounded-xl text-center">
            <span className="text-lg font-bold text-white tabular-nums">{materials.length}</span>
            <p className="text-[10px] text-slate-400 font-sans">Materials</p>
          </div>
          <div className="p-3 bg-white/10 rounded-xl text-center">
            <span className="text-lg font-bold text-red-400 tabular-nums">{pendingReports.length}</span>
            <p className="text-[10px] text-slate-400 font-sans">Flags</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg max-w-fit">
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 text-xs font-bold rounded-md transition-colors ${
            activeTab === 'reports' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Reported Content ({pendingReports.length})
        </button>
        <button
          onClick={() => setActiveTab('materials')}
          className={`px-4 py-2 text-xs font-bold rounded-md transition-colors ${
            activeTab === 'materials' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All Materials ({materials.length})
        </button>
        <button
          onClick={() => setActiveTab('doubts')}
          className={`px-4 py-2 text-xs font-bold rounded-md transition-colors ${
            activeTab === 'doubts' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All Doubts ({doubts.length})
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 text-xs font-bold rounded-md transition-colors ${
            activeTab === 'users' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Registered Users ({allUsers.length})
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            Reported Content Queue
          </h2>
          {reports.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-xs text-slate-500">
              No reports pending review. The platform is healthy.
            </div>
          ) : (
            <div className="space-y-3">
              {reports.map(rep => (
                <div key={rep.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase bg-red-100 text-red-700 px-2 py-0.5 rounded">
                        {rep.target_type} flag
                      </span>
                      <span className="text-xs font-bold text-slate-900">{rep.target_title}</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      <strong>Reason:</strong> {rep.reason}
                    </p>
                    {rep.details && (
                      <p className="text-xs text-slate-500 italic">
                        "{rep.details}"
                      </p>
                    )}
                    <p className="text-[10px] text-slate-400">
                      Reported by {rep.reporter_name} on {new Date(rep.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => resolveReport(rep.id, 'dismiss')}
                      className="px-3 py-1.5 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium"
                    >
                      Dismiss Report
                    </button>
                    <button
                      onClick={() => resolveReport(rep.id, 'delete')}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-2xs"
                    >
                      Remove Inappropriate Content
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'materials' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100 font-bold text-xs text-slate-900">
            Uploaded Materials Directory
          </div>
          <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
            {materials.map(m => (
              <div key={m.id} className="p-4 flex items-center justify-between text-xs hover:bg-slate-50">
                <div className="truncate max-w-lg">
                  <p className="font-bold text-slate-900 truncate">{m.title}</p>
                  <p className="text-slate-500">{m.subject} · {m.uploader_name} · {m.downloads_count} downloads</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => navigate(`/materials/${m.id}`)}
                    className="text-[#1557A6] font-semibold hover:underline"
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Delete this material as administrator?')) {
                        deleteMaterial(m.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'doubts' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100 font-bold text-xs text-slate-900">
            Doubt Discussions Directory
          </div>
          <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
            {doubts.map(d => (
              <div key={d.id} className="p-4 flex items-center justify-between text-xs hover:bg-slate-50">
                <div className="truncate max-w-lg">
                  <p className="font-bold text-slate-900 truncate">{d.title}</p>
                  <p className="text-slate-500">{d.subject} · Asked by {d.author_name} · {d.status}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => navigate(`/doubts/${d.id}`)}
                    className="text-[#1557A6] font-semibold hover:underline"
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Delete this doubt as administrator?')) {
                        deleteDoubt(d.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100 font-bold text-xs text-slate-900">
            Student Accounts
          </div>
          <div className="divide-y divide-slate-100">
            {allUsers.map(u => (
              <div key={u.id} className="p-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 font-bold flex items-center justify-center text-slate-700">
                    {u.avatar_url ? <img src={u.avatar_url} alt={u.full_name} className="w-full h-full object-cover" /> : u.full_name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{u.full_name}</p>
                    <p className="text-slate-500">{u.email} · {u.college}</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
