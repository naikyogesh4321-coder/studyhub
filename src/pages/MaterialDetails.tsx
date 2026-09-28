import React, { useEffect, useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import {
  FileText,
  Download,
  Bookmark,
  Share2,
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Eye,
  User,
  GraduationCap,
  CheckCircle,
  FileCheck,
  Trash2
} from 'lucide-react';
import { ReportModal } from '../components/ReportModal';
import { MaterialCard } from '../components/MaterialCard';

interface MaterialDetailsProps {
  materialId: string;
  navigate: (path: string) => void;
}

export const MaterialDetails: React.FC<MaterialDetailsProps> = ({
  materialId,
  navigate
}) => {
  const { materials, downloadMaterial, recordMaterialView, toggleBookmark, isBookmarked, deleteMaterial } = useData();
  const { user } = useAuth();
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const material = materials.find(m => m.id === materialId);

  useEffect(() => {
    if (materialId) {
      recordMaterialView(materialId);
    }
  }, [materialId]);

  if (!material) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Study Material Not Found</h2>
        <p className="text-xs text-slate-500">The requested material could not be found or has been removed.</p>
        <button
          onClick={() => navigate('/materials')}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#1557A6] rounded-lg"
        >
          Back to Materials
        </button>
      </div>
    );
  }

  const bookmarked = isBookmarked(material.id);
  const isOwner = user?.id === material.uploader_id || user?.role === 'admin';

  // Related materials
  const relatedMaterials = materials
    .filter(m => m.id !== material.id && (m.subject === material.subject || m.course === material.course))
    .slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to permanently delete this study resource?')) {
      const res = await deleteMaterial(material.id);
      if (res.success) {
        navigate('/materials');
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/materials')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#1557A6] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Materials</span>
        </button>
      </div>

      {/* Main Material Card Container */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Top Badges & Meta */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#EAF4FF] text-[#1557A6] border border-blue-200">
              {material.material_type}
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
              {material.file_type} Format
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Share */}
            <button
              onClick={handleShare}
              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>

            {/* Bookmark */}
            <button
              onClick={() => toggleBookmark(material.id, 'material')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors border ${
                bookmarked
                  ? 'bg-[#EAF4FF] text-[#1557A6] border-blue-200'
                  : 'text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
              <span>{bookmarked ? 'Saved' : 'Save'}</span>
            </button>

            {/* Report */}
            <button
              onClick={() => setReportModalOpen(true)}
              className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
              title="Report content"
            >
              <AlertTriangle className="w-4 h-4" />
            </button>

            {/* Delete for owner / admin */}
            {isOwner && (
              <button
                onClick={handleDelete}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete this material"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2A5B] tracking-tight leading-snug">
          {material.title}
        </h1>

        {/* Academic Degree / Subject Details */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-medium">
          <span className="text-[#1557A6] font-bold text-sm">{material.subject}</span>
          <span>·</span>
          <span>{material.course}</span>
          <span>·</span>
          <span>{material.semester}</span>
          <span>·</span>
          <span>Uploaded on {new Date(material.created_at).toLocaleDateString()}</span>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Resource Overview
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-100">
            {material.description}
          </p>
        </div>

        {/* Tags */}
        {material.tags && material.tags.length > 0 && (
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Key Academic Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {material.tags.map((tag, i) => (
                <span key={i} className="text-xs text-[#1557A6] bg-[#EAF4FF] px-2.5 py-1 rounded-md font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* File Preview Box & Download Hub */}
        <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-xl p-6 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white text-[#1557A6] flex items-center justify-center shadow-xs border border-slate-200 shrink-0">
              <FileText className="w-7 h-7 text-[#1557A6]" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 truncate max-w-sm sm:max-w-md">
                {material.file_name}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 font-mono">
                <span>{material.file_size}</span>
                <span>·</span>
                <span>{material.file_type} File</span>
                <span>·</span>
                <span>{material.downloads_count} Downloads</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => downloadMaterial(material)}
            className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-bold text-white bg-[#1557A6] hover:bg-[#0B2A5B] rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Download Material</span>
          </button>
        </div>

        {/* Author / Contributor Box */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-[#1557A6] text-white flex items-center justify-center font-bold text-sm shrink-0">
              {material.uploader_avatar ? (
                <img src={material.uploader_avatar} alt={material.uploader_name} className="w-full h-full object-cover" />
              ) : (
                material.uploader_name.charAt(0)
              )}
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">{material.uploader_name}</h4>
              <p className="text-[11px] text-slate-500">{material.uploader_college}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {material.views_count} views
            </span>
            <span className="flex items-center gap-1">
              <Download className="w-3.5 h-3.5" />
              {material.downloads_count} downloads
            </span>
          </div>
        </div>
      </div>

      {/* Related Materials Section */}
      {relatedMaterials.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#0B2A5B]">
            More Materials for {material.subject} & {material.course}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedMaterials.map(rel => (
              <MaterialCard
                key={rel.id}
                material={rel}
                onView={(id) => navigate(`/materials/${id}`)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Report Modal */}
      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        targetId={material.id}
        targetType="material"
        targetTitle={material.title}
      />
    </div>
  );
};
