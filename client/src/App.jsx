import React from 'react';
import { useState } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Nav from './Components/NavBar/Nav'
import Home from './Pages/Homepage/Home.jsx';
import Login from './Pages/Login/Login.jsx';
import Profile from './Pages/Profilepage/Profile.jsx';
import NewPost from './Components/NewPostForm/newPost.jsx';

import './index.css'
import './App.css'

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <>
      <Nav />
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login handleLogin={handleLogin} />} />
            <Route path='profile' element={<Profile />}/>
            <Route path='post' element={<NewPost />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </>
  )
}

export default App
