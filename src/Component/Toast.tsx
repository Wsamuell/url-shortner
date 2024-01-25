import { FiCopy } from 'react-icons/fi';
import '../Styles/Toast.css';

interface ToastProps {
  message: string;
}

const Toast = ({ message }: ToastProps) => {
  return (
    <div className="toast">
      <FiCopy className="toast-copy" />
      <div className="toast-message">{message}</div>
    </div>
  );
};

export default Toast;
