import { FaArrowRight } from 'react-icons/fa6';
import '../Styles/InputBox.css';
import Toast from './Toast';
import { useRef, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import Spacer from './Spacer';

interface InputBoxProps {
  placeholder: string;
}

interface ShortUrlData {
  getUrlByUrl: {
    shortenedUrl: string;
  };
}

const FETCH_OR_CREATE_SHORT_URL = gql`
  query GetUrlByUrl($getUrlByUrl: String!) {
    getUrlByUrl(url: $getUrlByUrl) {
      shortenedUrl
    }
  }
`;

const isValidUrl = (url: string): boolean => {
  // Regular expression for a valid URL
  const urlRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

  return urlRegex.test(url);
};

const InputBox = ({ placeholder }: InputBoxProps) => {
  const [showToast, setShowToast] = useState<boolean>(true);
  const [value, setValue] = useState('');
  const [toastMessage, setToastMessage] = useState('localhost:3000/zSiIZPM');
  const [validateError, setValidateError] = useState('');
  const { loading, error, data, refetch } = useQuery<ShortUrlData>(
    FETCH_OR_CREATE_SHORT_URL,
    {
      variables: { getUrlByUrl: value },
    }
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.trim();
    setValue(inputValue);
    setValidateError('');
  };
  const handleClose = () => {
    setShowToast(false);
  };
  const handleSubmitFetch = async () => {
    try {
      setValidateError('');
      if (!isValidUrl(value)) {
        setValidateError('Not a valid URL');
        inputRef.current?.focus();
        return;
      }

      await refetch();
      if (loading) return console.log('Loading...');
      if (error) return `Error! ${error.message}`;
      const shortenedUrl = data?.getUrlByUrl?.shortenedUrl;

      if (shortenedUrl) {
        setToastMessage(`localhost:3000/${shortenedUrl}`);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 10000);
      } else {
        setToastMessage('Hmmm... Try Again!');
        setShowToast(true);
      }
    } catch (err) {
      console.error('Error creating short URL:', err);
      setToastMessage('Error creating short URL');
      setShowToast(true);
    }
  };

  return (
    <div className="inputBox-container">
      <div className="input-container">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          onChange={(event) => handleValue(event)}
          style={{
            border: validateError && '1px solid #d30d14',
          }}
          className={validateError && 'shake'}
        />
        <FaArrowRight className="submit-arrow" onClick={handleSubmitFetch} />
        {showToast && (
          <Toast
            message={toastMessage}
            messageTitle="Simplifyed!"
            closeToast={handleClose}
          />
        )}
      </div>
      <Spacer height={3} width={0} />
      {validateError && <div className="error-message">{validateError}</div>}
    </div>
  );
};

export default InputBox;
