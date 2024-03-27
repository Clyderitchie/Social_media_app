import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';


import Auth from '../utils/auth';
import Tabs from '../Components/TabSection/Tabs';
import CreatePost from '../Components/PostContainer/CreatePost'
import Post from '../Components/PostContainer/Post';
import Trends from '../Components/Trends/TrendLayout';

import './home.css'

function Home ({ handleLogout, isLoggedIn }) {
    
    const userId = Auth.getProfile().data._id;

    const { data } = useQuery(QUERY_ME, );

    const user = data?.me || {};


    return (
        <>
        {!Auth.loggedIn() && window.location.replace("/")}
            <div className="container mt-4">
                <div className="row">
                    <div id="navSection" className="col-3">
                        <Tabs logout={handleLogout} userId={userId}/>
                    </div>
                    <div id="contentSection" className="col-6">
                        <CreatePost />
                        <Post userId={userId}/>
                    </div>
                    <div id="trendSection" className="col-3">
                        <Trends userId={userId}/>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Home;