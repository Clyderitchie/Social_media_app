import { Outlet } from 'react-router-dom';
import Navbar from './Components/NavBar/NavContent'

import './App.css'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()

});

function App() {


  return (
    <>
      <Navbar />
      <ApolloProvider client={client}>
          <Outlet />
      </ApolloProvider>
    </>
  )
}

export default App
