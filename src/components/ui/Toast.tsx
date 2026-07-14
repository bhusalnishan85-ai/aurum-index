import React, { createContext, useContext, useMemo, useState } from 'react';

interface ToastItem {
  id: number;
  message: string;
}

interface ToastContextValue {
  push: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const value = useMemo(() => ({
    push(message: string) {
      const id = Date.now();
      setItems((current) => [...current, { id, message }]);
      window.setTimeout(() => {
        setItems((current) => current.filter((item) => item.id !== id));
      }, 2600);
    }
  }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-[110] flex w-full max-w-sm flex-col gap-3 px-4">
        {items.map((item) => (
          <div key={item.id} className="museum-card rounded-[var(--r)] px-4 py-3 text-sm text-[var(--ink)]">
            {item.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
