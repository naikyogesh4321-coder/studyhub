import React from 'react';
import { CourseType, SemesterType, MaterialCategory, FileType } from '../types';
import { Filter, X, RotateCcw } from 'lucide-react';

export interface FilterState {
  course: string;
  semester: string;
  materialType: string;
  fileType: string;
  subject: string;
}

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onClearFilters: () => void;
  activeCount: number;
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

const FILE_TYPES: FileType[] = ['PDF', 'PPT', 'PPTX', 'DOC', 'DOCX', 'ZIP'];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  activeCount
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#1557A6]" />
          <h3 className="text-sm font-bold text-slate-900">Filters</h3>
          {activeCount > 0 && (
            <span className="w-5 h-5 bg-[#1557A6] text-white text-[11px] font-bold rounded-full flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>

        {activeCount > 0 && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 text-xs text-[#1557A6] hover:underline font-semibold"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Course Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Degree / Course
          </label>
          <select
            value={filters.course}
            onChange={(e) => onFilterChange('course', e.target.value)}
            className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1557A6] focus:bg-white text-slate-800"
          >
            <option value="">All Courses</option>
            {COURSES.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>

        {/* Semester Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Academic Semester
          </label>
          <select
            value={filters.semester}
            onChange={(e) => onFilterChange('semester', e.target.value)}
            className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1557A6] focus:bg-white text-slate-800"
          >
            <option value="">All Semesters</option>
            {SEMESTERS.map(sem => (
              <option key={sem} value={sem}>{sem}</option>
            ))}
          </select>
        </div>

        {/* Material Type Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Resource Category
          </label>
          <select
            value={filters.materialType}
            onChange={(e) => onFilterChange('materialType', e.target.value)}
            className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1557A6] focus:bg-white text-slate-800"
          >
            <option value="">All Categories</option>
            {MATERIAL_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* File Type Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            File Format
          </label>
          <select
            value={filters.fileType}
            onChange={(e) => onFilterChange('fileType', e.target.value)}
            className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1557A6] focus:bg-white text-slate-800"
          >
            <option value="">All Formats</option>
            {FILE_TYPES.map(ft => (
              <option key={ft} value={ft}>{ft}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
