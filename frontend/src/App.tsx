import Header from './Component/Header';
import InputBox from './Component/InputBox';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header
        title="URL. Simplified"
        subtitle="Creating a shortened URL has never been easier."
      />
      <InputBox placeholder="https://www.wsammy.com/" />
    </div>
  );
};

export default App;
