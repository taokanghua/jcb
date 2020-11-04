import Vue from 'vue';


type ToastMessage = string | number;
type MsgType = 'success' | 'error' | 'warn' | 'info';
type PositionEnum = 'top' | 'center' | 'bottom';
export type ToastOptions = {
  type?: MsgType;
  position: PositionEnum,
  onClose?: () => void;
  duration?: number;
};

export interface Toast extends Vue {
  (msg:ToastMessage, options?: ToastOptions):void;
  success(msg: ToastMessage, options?: ToastOptions): void;
  error(msg: ToastMessage, options?: ToastOptions): void;
  warn(msg: ToastMessage, options?: ToastOptions): void;
  info(msg: ToastMessage, options?: ToastOptions): void;
}

declare module 'vue/types/vue' {
  interface Vue {
    $Toast: Toast;
  }
}
export const Toast: Toast;
