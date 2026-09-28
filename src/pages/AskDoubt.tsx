import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { CourseType, SemesterType } from '../types';
import { HelpCircle, ArrowLeft, Paperclip, AlertCircle, CheckCircle } from 'lucide-react';

interface AskDoubtProps {
  navigate: (path: string) => void;
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

export const AskDoubt: React.FC<AskDoubtProps> = ({ navigate }) => {
  const { postDoubt } = useData();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [course, setCourse] = useState<CourseType>(user?.course || 'B.E / B.Tech');
  const [semester, setSemester] = useState<SemesterType>(user?.semester || '4th Semester');
  const [tagsInput, setTagsInput] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) {
      errs.title = 'Please enter a clear question title.';
    } else if (title.trim().length < 10) {
      errs.title = 'Title should be at least 10 characters to be clear.';
    }

    if (!description.trim()) {
      errs.description = 'Please describe the problem or context in detail.';
    } else if (description.trim().length < 20) {
      errs.description = 'Description should be at least 20 characters.';
    }

    if (!subject.trim()) {
      errs.subject = 'Subject name is required (e.g. Data Structures, DBMS).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);
    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const res = await postDoubt({
      title,
      description,
      subject,
      course,
      semester,
      tags,
      attachment: attachment || undefined
    });

    setIsSubmitting(false);

    if (res.success && res.doubt) {
      navigate(`/doubts/${res.doubt.id}`);
    } else {
      setErrors({ form: res.error || 'Failed to submit question. Please try again.' });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <button
          onClick={() => navigate('/doubts')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#1557A6]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Doubt Board</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0B2A5B]">
            Ask an Academic Doubt
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Be specific and include any errors or formulas you have tried so peers can give you accurate answers.
          </p>
        </div>

        {errors.form && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errors.form}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Question Title */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Question Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Why does Dijkstra fail on graphs with negative edge weights?"
              className={`w-full text-xs sm:text-sm p-3 bg-slate-50 border rounded-lg focus:outline-none focus:border-[#1557A6] focus:bg-white text-slate-800 ${
                errors.title ? 'border-red-400' : 'border-slate-200'
              }`}
            />
            {errors.title && (
              <p className="text-[11px] text-red-600 mt-1">{errors.title}</p>
            )}
          </div>

          {/* Subject, Course, Semester */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Subject *
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Operating Systems"
                className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:border-[#1557A6] focus:bg-white text-slate-800 ${
                  errors.subject ? 'border-red-400' : 'border-slate-200'
                }`}
              />
              {errors.subject && (
                <p className="text-[11px] text-red-600 mt-1">{errors.subject}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Degree / Course
              </label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value as CourseType)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1557A6] focus:bg-white text-slate-800"
              >
                {COURSES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Semester
              </label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value as SemesterType)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1557A6] focus:bg-white text-slate-800"
              >
                {SEMESTERS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Detailed Question Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              placeholder="Explain what you are trying to understand, paste the code snippet, or write the specific step where you got stuck..."
              className={`w-full text-xs sm:text-sm p-3.5 bg-slate-50 border rounded-lg focus:outline-none focus:border-[#1557A6] focus:bg-white text-slate-800 ${
                errors.description ? 'border-red-400' : 'border-slate-200'
              }`}
            />
            {errors.description && (
              <p className="text-[11px] text-red-600 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. GraphTheory, Dijkstra, ShortestPath"
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1557A6] focus:bg-white text-slate-800"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Add keywords to help subject peers discover your question easily.
            </p>
          </div>

          {/* Optional Attachment */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Optional Diagram / Reference File Attachment
            </label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200">
                <Paperclip className="w-3.5 h-3.5" />
                <span>{attachment ? attachment.name : 'Choose File (Image/PDF/Doc)'}</span>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setAttachment(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />
              </label>

              {attachment && (
                <button
                  type="button"
                  onClick={() => setAttachment(null)}
                  className="text-xs text-red-600 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/doubts')}
              className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#1557A6] hover:bg-[#0B2A5B] disabled:opacity-50 rounded-xl shadow-xs transition-colors"
            >
              {isSubmitting ? 'Posting Doubt...' : 'Post Doubt'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
