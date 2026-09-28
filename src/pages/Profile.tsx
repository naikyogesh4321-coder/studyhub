import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { MaterialCard } from '../components/MaterialCard';
import { DoubtCard } from '../components/DoubtCard';
import {
  User,
  GraduationCap,
  Calendar,
  Edit3,
  UploadCloud,
  HelpCircle,
  MessageSquare,
  ThumbsUp,
  Bookmark,
  X,
  Check
} from 'lucide-react';
import { CourseType, SemesterType } from '../types';

interface ProfileProps {
  navigate: (path: string) => void;
  initialTab?: 'materials' | 'doubts' | 'answers' | 'saved';
}

const COURSES: CourseType[] = [
  'B.E / B.Tech',
  'BCA',
  'B.Sc',
  'BBA',
  'B.Com',
  'MCA',
  'MBA',
  'M.Com',
  'Other'
];

const SEMESTERS: SemesterType[] = [
  '1st Semester',
  '2nd Semester',
  '3rd Semester',
  '4th Semester',
  '5th Semester',
  '6th Semester',
  '7th Semester',
  '8th Semester'
];

export const Profile: React.FC<ProfileProps> = ({ navigate, initialTab = 'materials' }) => {
  const { user, updateProfile } = useAuth();
  const { materials, doubts, answers, bookmarks } = useData();

  const [activeTab, setActiveTab] = useState<'materials' | 'doubts' | 'answers' | 'saved'>(initialTab);
  const [isEditing, setIsEditing] = useState(false);

  // Edit Form State
  const [editName, setEditName] = useState(user?.full_name || '');
  const [editCollege, setEditCollege] = useState(user?.college || '');
  const [editCourse, setEditCourse] = useState<CourseType>(user?.course || 'B.E / B.Tech');
  const [editSemester, setEditSemester] = useState<SemesterType>(user?.semester || '4th Semester');
  const [editBio, setEditBio] = useState(user?.bio || '');

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Sign in to view your profile</h2>
        <button
          onClick={() => navigate('/login')}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#1557A6] rounded-lg"
        >
          Sign In
        </button>
      </div>
    );
  }

  // Real user activity items
  const userMaterials = materials.filter(m => m.uploader_id === user.id);
  const userDoubts = doubts.filter(d => d.author_id === user.id);
  const userAnswers = answers.filter(a => a.author_id === user.id);
  const userBookmarks = bookmarks.filter(b => b.user_id === user.id);

  const helpfulVotes = userAnswers.reduce((acc, a) => acc + a.upvotes_count, 0) +
    userDoubts.reduce((acc, d) => acc + d.upvotes_count, 0);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      full_name: editName.trim(),
      college: editCollege.trim(),
      course: editCourse,
      semester: editSemester,
      bio: editBio.trim()
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Overview Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-[#1557A6] text-white flex items-center justify-center font-bold text-2xl shadow-sm shrink-0">
              {user.avatar_url ? (
                <img src={user.avatar_url} alt={user.full_name} className="w-full h-full object-cover" />
              ) : (
                user.full_name.charAt(0)
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B2A5B]">
                  {user.full_name}
                </h1>
                {user.role === 'admin' && (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                    Admin
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                {user.college} · {user.course} ({user.semester})
              </p>
              <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                <span>{user.email}</span>
                <span>·</span>
                <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setEditName(user.full_name);
              setEditCollege(user.college);
              setEditCourse(user.course);
              setEditSemester(user.semester);
              setEditBio(user.bio || '');
              setIsEditing(true);
            }}
            className="px-4 py-2 text-xs font-semibold text-[#1557A6] bg-[#EAF4FF] hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="text-xs text-slate-600 leading-relaxed pt-4 font-normal">
            {user.bio}
          </p>
        )}

        {/* Real Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100 mt-4">
          <div className="p-3 bg-slate-50 rounded-xl text-center">
            <span className="text-xl font-extrabold text-[#0B2A5B] font-mono tabular-nums">
              {userMaterials.length}
            </span>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">Materials Shared</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl text-center">
            <span className="text-xl font-extrabold text-[#0B2A5B] font-mono tabular-nums">
              {userDoubts.length}
            </span>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">Doubts Asked</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl text-center">
            <span className="text-xl font-extrabold text-[#0B2A5B] font-mono tabular-nums">
              {userAnswers.length}
            </span>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">Answers Given</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl text-center">
            <span className="text-xl font-extrabold text-[#0B2A5B] font-mono tabular-nums">
              {helpfulVotes}
            </span>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">Helpful Votes</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('materials')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
              activeTab === 'materials'
                ? 'bg-[#1557A6] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            My Materials ({userMaterials.length})
          </button>
          <button
            onClick={() => setActiveTab('doubts')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
              activeTab === 'doubts'
                ? 'bg-[#1557A6] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            My Doubts ({userDoubts.length})
          </button>
          <button
            onClick={() => setActiveTab('answers')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
              activeTab === 'answers'
                ? 'bg-[#1557A6] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            My Answers ({userAnswers.length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
              activeTab === 'saved'
                ? 'bg-[#1557A6] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Saved ({userBookmarks.length})
          </button>
        </div>

        {/* Tab Panels */}
        {activeTab === 'materials' && (
          <div>
            {userMaterials.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-2">
                <p className="text-sm font-bold text-slate-800">You haven't uploaded any study materials yet</p>
                <button
                  onClick={() => navigate('/upload')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#1557A6] rounded-lg mt-2 inline-block"
                >
                  Upload First Material
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userMaterials.map(mat => (
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
            {userDoubts.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-2">
                <p className="text-sm font-bold text-slate-800">You haven't asked any doubts yet</p>
                <button
                  onClick={() => navigate('/ask-doubt')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#1557A6] rounded-lg mt-2 inline-block"
                >
                  Ask a Doubt
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userDoubts.map(doubt => {
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
            {userAnswers.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-2">
                <p className="text-sm font-bold text-slate-800">You haven't posted any peer answers yet</p>
                <button
                  onClick={() => navigate('/doubts')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#1557A6] rounded-lg mt-2 inline-block"
                >
                  Browse Questions to Answer
                </button>
              </div>
            ) : (
              <div className="space-y-4 max-w-3xl">
                {userAnswers.map(ans => (
                  <div key={ans.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-mono">
                        Posted {new Date(ans.created_at).toLocaleDateString()}
                      </span>
                      {ans.is_accepted && (
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          ✓ Accepted Solution
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-800 whitespace-pre-line leading-relaxed">
                      {ans.content}
                    </p>
                    <div className="pt-2 flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-medium">
                        {ans.upvotes_count} helpful upvotes
                      </span>
                      <button
                        onClick={() => navigate(`/doubts/${ans.doubt_id}`)}
                        className="text-[#1557A6] hover:underline font-semibold"
                      >
                        View Question Discussion →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'saved' && (
          <div>
            <div className="text-xs text-slate-500 mb-3">
              You have {userBookmarks.length} bookmarked items.
            </div>
            <button
              onClick={() => navigate('/saved')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#1557A6] rounded-lg"
            >
              Open Full Saved Manager →
            </button>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">Edit Student Profile</h3>
              <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1557A6] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  College / University
                </label>
                <input
                  type="text"
                  value={editCollege}
                  onChange={(e) => setEditCollege(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1557A6] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Course
                  </label>
                  <select
                    value={editCourse}
                    onChange={(e) => setEditCourse(e.target.value as CourseType)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1557A6]"
                  >
                    {COURSES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Semester
                  </label>
                  <select
                    value={editSemester}
                    onChange={(e) => setEditSemester(e.target.value as SemesterType)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1557A6]"
                  >
                    {SEMESTERS.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Academic Bio / Interests
                </label>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  rows={3}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1557A6] focus:bg-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#1557A6] hover:bg-[#0B2A5B] rounded-lg transition-colors shadow-xs"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
