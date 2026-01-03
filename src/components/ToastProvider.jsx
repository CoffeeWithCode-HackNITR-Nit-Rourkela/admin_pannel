import React, { createContext, useCallback, useContext, useState } from "react";
import { colors } from "../constants/color";

const ToastContext = createContext(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};

const TOAST_DURATION = 3000;

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null); // { message, type }

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, TOAST_DURATION);
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex flex-col gap-2">
          <div
            className="px-4 py-3 rounded-2xl shadow-lg min-w-[260px] max-w-sm text-sm font-poppins flex items-start gap-3 bg-white/90 backdrop-blur"
            style={{
              border: `1px solid ${toast.type === "success" ? colors.primeGreen : colors.primeRed}`,
              boxShadow: "0 18px 45px rgba(15, 23, 42, 0.14)",
            }}
          >
            <span className="mt-0.5 text-lg">
              {toast.type === "success" ? "✅" : "⚠️"}
            </span>
            <div className="flex-1">
              <p className="text-xs font-medium mb-1" style={{ color: colors.darkgray }}>
                {toast.type === "success" ? "Success" : "Something went wrong"}
              </p>
              <p className="leading-snug text-[13px]" style={{ color: colors.darkgray }}>
                {toast.message}
              </p>
            </div>
            <button
              type="button"
              onClick={hideToast}
              className="ml-2 text-xs rounded-full p-1 hover:bg-gray-100 transition-colors"
              aria-label="Close notification"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};
