import React from 'react';

export const MaterialCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse space-y-4">
      <div className="flex justify-between items-center">
        <div className="h-4 w-16 bg-slate-200 rounded"></div>
        <div className="h-4 w-6 bg-slate-200 rounded"></div>
      </div>
      <div className="h-5 w-3/4 bg-slate-200 rounded"></div>
      <div className="h-3 w-1/2 bg-slate-200 rounded"></div>
      <div className="space-y-2">
        <div className="h-3 w-full bg-slate-200 rounded"></div>
        <div className="h-3 w-4/5 bg-slate-200 rounded"></div>
      </div>
      <div className="pt-3 border-t border-slate-100 flex justify-between">
        <div className="h-3 w-20 bg-slate-200 rounded"></div>
        <div className="h-3 w-24 bg-slate-200 rounded"></div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="h-8 bg-slate-200 rounded-lg"></div>
        <div className="h-8 bg-slate-200 rounded-lg"></div>
      </div>
    </div>
  );
};

export const DoubtCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse space-y-3">
      <div className="flex justify-between">
        <div className="h-4 w-20 bg-slate-200 rounded"></div>
        <div className="h-4 w-6 bg-slate-200 rounded"></div>
      </div>
      <div className="h-5 w-4/5 bg-slate-200 rounded"></div>
      <div className="h-3 w-full bg-slate-200 rounded"></div>
      <div className="flex gap-2">
        <div className="h-4 w-12 bg-slate-200 rounded"></div>
        <div className="h-4 w-14 bg-slate-200 rounded"></div>
      </div>
      <div className="pt-3 border-t border-slate-100 flex justify-between">
        <div className="h-4 w-24 bg-slate-200 rounded"></div>
        <div className="h-4 w-16 bg-slate-200 rounded"></div>
      </div>
    </div>
  );
};
