import Header from './Component/Header';
import InputBox from './Component/InputBox';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import './App.css';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:3000/graphql',
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="fade-in">
        <Header
          title="URL. Simplifyed"
          subtitle="Creating a shortened URL has never been easier."
        />
        <InputBox placeholder="https://www.wsammy.com/" />
      </div>
    </ApolloProvider>
  );
};

export default App;
