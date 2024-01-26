import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import { VscCheck } from 'react-icons/vsc';
import { IoCloseOutline } from 'react-icons/io5';
import '../Styles/Toast.css';
import Spacer from './Spacer';

interface ToastProps {
  message: string;
  messageTitle: string;
  closeToast: () => void;
}

const Toast = ({ message, messageTitle, closeToast }: ToastProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  const handleRedirect = () => {
    window.open(message, '_blank');
  };

  return (
    <div className="toast">
      {!isCopied ? (
        <FiCopy className="toast-copy" onClick={handleCopy} />
      ) : (
        <VscCheck className="toast-copied" />
      )}
      <Spacer width={10} />
      <div className="toast-message">
        <div className="message-title">{messageTitle}</div>
        <Spacer height={5} />
        <div className="message-url" onClick={handleRedirect}>
          {message}
        </div>
      </div>
      <Spacer width={25} />
      <IoCloseOutline className="close-toast" onClick={closeToast} />
    </div>
  );
};

export default Toast;
