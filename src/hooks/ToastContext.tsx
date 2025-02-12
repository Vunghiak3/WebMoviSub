"use client";

import { createContext, useContext, ReactNode } from "react";
import { Theme, toast, ToastPosition } from "react-toastify";

interface ToastContextType {
  showToast: (
    message: string,
    type: "success" | "error" | "info",
    position?: ToastPosition,
    time?: number | boolean,
    theme?: Theme
  ) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const showToast = (
    message: string,
    type: "success" | "error" | "info",
    position: ToastPosition = "bottom-right",
    time = 1000,
    theme: Theme = "colored"
  ) => {
    switch (type) {
      case "success":
        toast.success(message, {
          position,
          autoClose: time,
          theme,
        });
        break;
      case "error":
        toast.error(message, {
          position,
          autoClose: time,
          theme,
        });
        break;
      case "info":
        toast.info(message, {
          position,
          autoClose: time,
          theme,
        });
        break;
      default:
        break;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
