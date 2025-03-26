declare module 'vue-toastification' {
    export function useToast(): {
      success: (message: string, options?: Record<string, any>) => void;
      error: (message: string, options?: Record<string, any>) => void;
      info: (message: string, options?: Record<string, any>) => void;
      warning: (message: string, options?: Record<string, any>) => void;
    };
  }
  