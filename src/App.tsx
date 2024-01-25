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
      <Header
        title="URL. Simplified"
        subtitle="Creating a shortened URL has never been easier."
      />
      <InputBox placeholder="https://www.wsammy.com/" />
    </ApolloProvider>
  );
};

export default App;
