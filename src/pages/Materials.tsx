import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { MaterialCard } from '../components/MaterialCard';
import { FilterPanel, FilterState } from '../components/FilterPanel';
import { EmptyState } from '../components/EmptyState';
import { Search, ArrowUpDown, Filter, Upload, BookOpen } from 'lucide-react';

interface MaterialsProps {
  navigate: (path: string) => void;
  initialQuery?: string;
  initialType?: string;
}

export const Materials: React.FC<MaterialsProps> = ({
  navigate,
  initialQuery = '',
  initialType = ''
}) => {
  const { materials, searchQuery, setSearchQuery } = useData();

  const [localSearch, setLocalSearch] = useState(initialQuery || searchQuery);
  const [sortBy, setSortBy] = useState<'newest' | 'downloads' | 'views' | 'relevant'>('newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    course: '',
    semester: '',
    materialType: initialType || '',
    fileType: '',
    subject: ''
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      course: '',
      semester: '',
      materialType: '',
      fileType: '',
      subject: ''
    });
    setLocalSearch('');
    setSearchQuery('');
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length + (localSearch.trim() ? 1 : 0);

  // Filter & Sort Logic
  const filteredMaterials = useMemo(() => {
    return materials
      .filter(item => {
        // Search query filter
        const query = localSearch.trim().toLowerCase();
        if (query) {
          const matchTitle = item.title.toLowerCase().includes(query);
          const matchSubject = item.subject.toLowerCase().includes(query);
          const matchCourse = item.course.toLowerCase().includes(query);
          const matchDesc = item.description.toLowerCase().includes(query);
          const matchUploader = item.uploader_name.toLowerCase().includes(query);
          const matchTags = item.tags.some(t => t.toLowerCase().includes(query));

          if (!matchTitle && !matchSubject && !matchCourse && !matchDesc && !matchUploader && !matchTags) {
            return false;
          }
        }

        // Course filter
        if (filters.course && item.course !== filters.course) return false;

        // Semester filter
        if (filters.semester && item.semester !== filters.semester) return false;

        // Material Type filter
        if (filters.materialType && item.material_type !== filters.materialType) return false;

        // File Type filter
        if (filters.fileType && item.file_type !== filters.fileType) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
        if (sortBy === 'downloads') {
          return b.downloads_count - a.downloads_count;
        }
        if (sortBy === 'views') {
          return b.views_count - a.views_count;
        }
        if (sortBy === 'relevant') {
          return (b.downloads_count + b.views_count) - (a.downloads_count + a.views_count);
        }
        return 0;
      });
  }, [materials, localSearch, filters, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0B2A5B] tracking-tight">
            Explore Study Materials
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Browse verified lecture notes, previous question papers, formula sheets, and practical lab manuals.
          </p>
        </div>

        <button
          onClick={() => navigate('/upload')}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#1557A6] hover:bg-[#0B2A5B] rounded-lg shadow-sm transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Study Material</span>
        </button>
      </div>

      {/* Main Grid: Left Filters, Right Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left Filter Panel (Desktop) */}
        <div className="hidden lg:block lg:col-span-1 sticky top-20">
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            activeCount={activeFiltersCount}
          />
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search bar + Sort controls */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                value={localSearch}
                onChange={(e) => {
                  setLocalSearch(e.target.value);
                  setSearchQuery(e.target.value);
                }}
                placeholder="Search by title, subject, tags..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1557A6] focus:bg-white text-slate-800 transition-colors"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              {localSearch && (
                <button
                  onClick={() => {
                    setLocalSearch('');
                    setSearchQuery('');
                  }}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 p-0.5 text-xs"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>


            {/* Mobile Filter Toggle + Sorting */}
            <div className="flex items-center justify-between w-full sm:w-auto gap-3">
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 whitespace-nowrap">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1557A6] text-slate-800 font-medium"
                >
                  <option value="newest">Newest First</option>
                  <option value="downloads">Most Downloaded</option>
                  <option value="views">Most Viewed</option>
                  <option value="relevant">Most Relevant</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mobile Filter Drawer */}
          {mobileFilterOpen && (
            <div className="lg:hidden">
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                activeCount={activeFiltersCount}
              />
            </div>
          )}

          {/* Result Count and Active Filters Bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <p>
              Showing <span className="font-semibold text-slate-900 tabular-nums">{filteredMaterials.length}</span> study materials
            </p>
            {activeFiltersCount > 0 && (
              <button
                onClick={handleClearFilters}
                className="text-[#1557A6] hover:underline font-semibold"
              >
                Clear all active filters
              </button>
            )}
          </div>

          {/* Cards Grid or Empty State */}
          {filteredMaterials.length === 0 ? (
            <EmptyState
              icon={BookOpen}
              title="No study materials found"
              description="Try changing your filters, clearing search terms, or be the first to upload lecture notes for this course!"
              actionText="Upload Material"
              onAction={() => navigate('/upload')}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMaterials.map(mat => (
                <MaterialCard
                  key={mat.id}
                  material={mat}
                  onView={(id) => navigate(`/materials/${id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
