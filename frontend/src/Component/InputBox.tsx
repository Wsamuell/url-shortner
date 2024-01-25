import { FaArrowRight } from 'react-icons/fa6';
import '../Styles/InputBox.css';
import Toast from './Toast';
import { useState } from 'react';

interface InputBoxProps {
  placeholder: string;
}

// const FETCH_OR_CREATE_SHORT_URL =

const InputBox = ({ placeholder }: InputBoxProps) => {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [value, setValue] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleSubmitFetch = () => {
    try {
      console.log(value);
    } catch (err) {
      console.error('Error creating short URL:', err);
      setToastMessage('Error creating short URL');
      setShowToast(true);
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        placeholder={placeholder}
        onChange={(event) => handleValue(event)}
      />
      <FaArrowRight className="submit-arrow" onClick={handleSubmitFetch} />
      {showToast && <Toast message={toastMessage} />}
    </div>
  );
};

export default InputBox;
