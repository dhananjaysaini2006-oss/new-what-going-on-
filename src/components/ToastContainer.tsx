import React from 'react';
import { ToastMessage } from '../types';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export type { ToastMessage };

interface ToastContainerProps {
  toasts?: ToastMessage[];
  onDismiss?: (id: string) => void;
  onRemoveToast?: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts = [], onDismiss, onRemoveToast }) => {
  const dismissHandler = onDismiss || onRemoveToast || (() => {});
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const Icon = toast.type === 'success' ? CheckCircle2 : toast.type === 'warning' ? AlertCircle : Info;
        const iconColor = toast.type === 'success' ? 'text-emerald-500' : toast.type === 'warning' ? 'text-amber-500' : 'text-[#E63946]';

        return (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            role="alert"
            className="pointer-events-auto flex items-start gap-3 p-4 bg-white dark:bg-[#1A1D24] text-[#111215] dark:text-[#F5F5F2] border border-[#D9D9D5] dark:border-[#2E333D] rounded-lg shadow-xl transition-all duration-300 transform translate-y-0"
          >
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold tracking-tight">{toast.title}</h4>
              <p className="text-xs text-[#5F6368] dark:text-[#A7AAB0] mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              id={`close-toast-${toast.id}`}
              onClick={() => dismissHandler(toast.id)}
              className="text-[#5F6368] hover:text-[#111215] dark:text-[#A7AAB0] dark:hover:text-white p-1 rounded transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
