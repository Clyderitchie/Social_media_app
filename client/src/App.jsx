import { Outlet } from 'react-router-dom';
import Nav from './Components/NavBar/Nav'

import './App.css'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()

});

function App() {


  return (
    <>
      <Nav />
      <ApolloProvider client={client}>
          <Outlet />
      </ApolloProvider>
    </>
  )
}

export default App
