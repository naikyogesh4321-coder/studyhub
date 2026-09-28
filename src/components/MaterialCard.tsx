import React from 'react';
import { Material } from '../types';
import { Download, Eye, Bookmark, FileText, ArrowUpRight, GraduationCap, Calendar, User } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';

interface MaterialCardProps {
  material: Material;
  onView: (id: string) => void;
}

export const MaterialCard: React.FC<MaterialCardProps> = ({ material, onView }) => {
  const { downloadMaterial, toggleBookmark, isBookmarked } = useData();
  const { showToast } = useToast();
  const bookmarked = isBookmarked(material.id);

  const getFileBadgeColor = (type: string) => {
    switch (type.toUpperCase()) {
      case 'PDF':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'PPT':
      case 'PPTX':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'DOC':
      case 'DOCX':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark(material.id, 'material');
    if (bookmarked) {
      showToast('Removed from your saved items', 'info');
    } else {
      showToast('Saved to your bookmarks!', 'success');
    }
  };

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    downloadMaterial(material);
    showToast(`Downloading "${material.title}"`, 'success');
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-[#2878D4]/40 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group h-full">
      <div>
        {/* Top bar: Category + File Type + Bookmark */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded border uppercase tracking-wide ${getFileBadgeColor(material.file_type)}`}>
              {material.file_type}
            </span>
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
              {material.material_type}
            </span>
          </div>

          <button
            onClick={handleBookmarkClick}
            aria-label={bookmarked ? "Remove bookmark" : "Save bookmark"}
            title={bookmarked ? "Bookmarked" : "Save to bookmarks"}
            className={`p-1.5 rounded-lg border transition-all duration-200 ${
              bookmarked
                ? 'bg-[#EAF4FF] text-[#1557A6] border-blue-200 shadow-2xs'
                : 'text-slate-400 border-transparent hover:text-[#1557A6] hover:bg-[#EAF4FF]/60 hover:border-blue-100'
            }`}
          >
            <Bookmark className={`w-4 h-4 transition-transform active:scale-125 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3
          onClick={() => onView(material.id)}
          className="text-base font-bold text-[#172033] group-hover:text-[#1557A6] transition-colors cursor-pointer line-clamp-2 leading-snug mb-2"
        >
          {material.title}
        </h3>

        {/* Academic context tags (unboxed clean academic typography) */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#6B7280] mb-3 font-medium">
          <span className="text-[#1557A6] font-semibold hover:underline cursor-pointer" onClick={() => onView(material.id)}>
            {material.subject}
          </span>
          <span className="text-slate-300">·</span>
          <span>{material.course}</span>
          <span className="text-slate-300">·</span>
          <span>{material.semester}</span>
        </div>

        {/* Description snippet */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {material.description}
        </p>
      </div>

      <div>
        {/* Metadata stats bar */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mb-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-mono text-[11px] text-slate-600" title="Downloads">
              <Download className="w-3.5 h-3.5 text-[#1557A6]" />
              {material.downloads_count}
            </span>
            <span className="flex items-center gap-1 font-mono text-[11px] text-slate-600" title="Views">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              {material.views_count}
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {material.file_size}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-600 truncate max-w-[130px]" title={material.uploader_name}>
            <div className="w-4 h-4 rounded-full bg-[#1557A6]/10 text-[#1557A6] flex items-center justify-center font-bold text-[9px] shrink-0">
              {material.uploader_name.charAt(0)}
            </div>
            <span className="truncate font-medium">{material.uploader_name}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onView(material.id)}
            className="w-full py-2 px-3 text-xs font-semibold text-[#1557A6] bg-[#EAF4FF] hover:bg-[#d8ecff] rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleDownloadClick}
            className="w-full py-2 px-3 text-xs font-semibold text-white bg-[#1557A6] hover:bg-[#0B2A5B] rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

