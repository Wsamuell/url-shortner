import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import { VscCheck } from 'react-icons/vsc';

import '../Styles/Toast.css';
import Spacer from './Spacer';

interface ToastProps {
  message: string;
}

const Toast = ({ message }: ToastProps) => {
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
        <VscCheck />
      )}
      <Spacer width={10} />
      <div className="toast-message" onClick={handleRedirect}>
        {message}
      </div>
    </div>
  );
};

export default Toast;
