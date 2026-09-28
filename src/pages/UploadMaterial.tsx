import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { CourseType, SemesterType, MaterialCategory } from '../types';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  X
} from 'lucide-react';

interface UploadMaterialProps {
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

const MATERIAL_TYPES: MaterialCategory[] = [
  'Notes',
  'Question Papers',
  'PPT',
  'Assignments',
  'Lab Manuals',
  'Reference Books',
  'Cheat Sheets',
  'Other'
];

const ALLOWED_EXTENSIONS = ['pdf', 'ppt', 'pptx', 'doc', 'docx', 'zip'];
const MAX_FILE_SIZE_MB = 50;

export const UploadMaterial: React.FC<UploadMaterialProps> = ({ navigate }) => {
  const { uploadMaterial } = useData();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [course, setCourse] = useState<CourseType>(user?.course || 'B.E / B.Tech');
  const [semester, setSemester] = useState<SemesterType>(user?.semester || '3rd Semester');
  const [materialType, setMaterialType] = useState<MaterialCategory>('Notes');
  const [tagsInput, setTagsInput] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!title.trim()) {
      errs.title = 'Please enter a descriptive resource title.';
    } else if (title.trim().length < 6) {
      errs.title = 'Title must be at least 6 characters.';
    }

    if (!subject.trim()) {
      errs.subject = 'Subject name is required (e.g. Data Structures, Operating Systems).';
    }

    if (!description.trim()) {
      errs.description = 'Please provide an overview or chapter breakdown.';
    }

    if (!file) {
      errs.file = 'Please select a study material file to upload.';
    } else {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        errs.file = `Unsupported file type (.${ext}). Allowed: PDF, PPT, PPTX, DOC, DOCX, ZIP.`;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        errs.file = `File size exceeds the ${MAX_FILE_SIZE_MB}MB limit.`;
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    if (!validate() || !file) return;

    setIsUploading(true);
    setUploadProgress(20);

    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 25;
      });
    }, 150);

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const res = await uploadMaterial({
      title,
      description,
      subject,
      course,
      semester,
      material_type: materialType,
      tags,
      file
    });

    clearInterval(progressInterval);
    setUploadProgress(100);

    if (res.success && res.material) {
      setSuccessMessage('Material uploaded successfully.');
      setTimeout(() => {
        setIsUploading(false);
        navigate(`/materials/${res.material?.id}`);
      }, 1000);
    } else {
      setIsUploading(false);
      setErrors({ form: res.error || 'Unable to upload file. Please try again.' });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <button
          onClick={() => navigate('/materials')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#1557A6]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Materials</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0B2A5B]">
            Upload Study Material
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Share high quality notes, previous exam question papers, or laboratory guides with your college peers.
          </p>
        </div>

        {successMessage && (
          <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
        )}

        {errors.form && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errors.form}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* File Upload Area */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Select or Drop File (PDF, PPT, DOC, ZIP up to 50MB) *
            </label>

            {!file ? (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                  errors.file
                    ? 'border-red-300 bg-red-50/30'
                    : 'border-slate-300 hover:border-[#1557A6] bg-slate-50/50 hover:bg-[#EAF4FF]/30'
                }`}
              >
                <input
                  type="file"
                  id="material-file-input"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFile(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />
                <label htmlFor="material-file-input" className="cursor-pointer block">
                  <div className="w-12 h-12 rounded-xl bg-[#EAF4FF] text-[#1557A6] flex items-center justify-center mx-auto mb-3">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-bold text-slate-900">
                    Click to browse or drag and drop your document
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Allowed formats: PDF, PPT, PPTX, DOC, DOCX, ZIP (Max 50MB)
                  </p>
                </label>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-[#1557A6] flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 truncate max-w-xs sm:max-w-md">
                      {file.name}
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB · {file.name.split('.').pop()?.toUpperCase()}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="p-1 text-slate-400 hover:text-red-600 rounded-md"
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            {errors.file && (
              <p className="text-[11px] text-red-600 mt-1">{errors.file}</p>
            )}
          </div>

          {/* Progress bar if uploading */}
          {isUploading && (
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                <span>Uploading study material...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1557A6] transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Material Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Data Structures & Algorithms - Complete Lecture Series Notes"
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
                Subject Name *
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Database Systems"
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
                Course / Branch
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

          {/* Category Type */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Material Category
            </label>
            <select
              value={materialType}
              onChange={(e) => setMaterialType(e.target.value as MaterialCategory)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1557A6] focus:bg-white text-slate-800"
            >
              {MATERIAL_TYPES.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Resource Description & Table of Contents *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Mention key topics covered, syllabus units, or university name so students know this matches their syllabus..."
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
              placeholder="e.g. Normalization, SQL, Indexing, BCNF"
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1557A6] focus:bg-white text-slate-800"
            />
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/materials')}
              className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUploading}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#1557A6] hover:bg-[#0B2A5B] disabled:opacity-50 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <UploadCloud className="w-4 h-4" />
              <span>{isUploading ? 'Uploading...' : 'Upload Material'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
