import { FaArrowRight } from 'react-icons/fa6';
import '../Styles/InputBox.css';
import Toast from './Toast';
import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';

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

const InputBox = ({ placeholder }: InputBoxProps) => {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [value, setValue] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const { loading, error, data, refetch } = useQuery<ShortUrlData>(
    FETCH_OR_CREATE_SHORT_URL,
    {
      variables: { getUrlByUrl: value },
    }
  );

  const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleSubmitFetch = async () => {
    try {
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
