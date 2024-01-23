import { FaArrowRight } from 'react-icons/fa6';
import '../Styles/InputBox.css';

interface InputBoxProps {
  placeholder: string;
}

const InputBox = ({ placeholder }: InputBoxProps) => {
  return (
    <div className="input-container">
      <input type="text" placeholder={placeholder} />
      <FaArrowRight className="submit-arrow" />
    </div>
  );
};

export default InputBox;
