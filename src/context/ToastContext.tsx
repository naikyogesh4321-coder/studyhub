import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, title?: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'success', title?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev.slice(-3), { id, type, title, message }]);

    setTimeout(() => {
      removeToast(id);
    }, 3800);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}

      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4 sm:px-0">
        {toasts.map(toast => {
          let bgClass = 'bg-white border-slate-200 text-slate-800';
          let icon = <CheckCircle2 className="w-4 h-4 text-[#1E9E62] shrink-0" />;

          if (toast.type === 'error') {
            bgClass = 'bg-white border-red-200 text-slate-800';
            icon = <AlertCircle className="w-4 h-4 text-[#D64545] shrink-0" />;
          } else if (toast.type === 'info') {
            bgClass = 'bg-white border-blue-200 text-slate-800';
            icon = <Info className="w-4 h-4 text-[#1557A6] shrink-0" />;
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg ${bgClass} transition-all duration-300 animate-in fade-in slide-in-from-bottom-2`}
              role="alert"
            >
              {icon}
              <div className="flex-1 min-w-0">
                {toast.title && (
                  <h4 className="text-xs font-bold text-slate-900 leading-tight mb-0.5">
                    {toast.title}
                  </h4>
                )}
                <p className="text-xs text-slate-600 leading-relaxed break-words font-medium">
                  {toast.message}
                </p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors"
                aria-label="Close notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      showToast: () => {},
      removeToast: () => {}
    };
  }
  return context;
};
