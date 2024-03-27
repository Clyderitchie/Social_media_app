import React from 'react';
import { useState } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Nav from './Components/NavBar/Nav'
import Home from './Pages/Homepage/Home';
import Login from './Pages/Login/Login';
import Profile from './Pages/ProfilePage/Profile';
import NewPost from './Components/NewPostForm/newPost';
import UserProfile from './Pages/OtherUserProfile/User';

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
      
      <ApolloProvider client={client}>
      <Nav />
        <Router>
          <Routes>
            <Route path='/home' element={<Home isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
            <Route path='/' element={<Login handleLogin={handleLogin} />} />
            <Route path='/profile' element={<Profile />}/>
            <Route path='/user/:userId' element={<UserProfile />} />
            <Route path='post' element={<NewPost />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </>
  )
}

export default App