import React from 'react';
import Auth from '../../utils/auth';

import Tabs from '../../Components/TabSection/Tabs';
import CreatePost from '../../Components/PostContainer/CreatePost'
import Post from '../../Components/PostContainer/Post';
import ImagePost from '../../Components/PostContainer/ImagePost';
import TopTrends from '../../Components/WhatsHappening/TopTrends';
import PostBtn from '../../Components/PostButton/Post';


import './Home.css'

function Home () {

    return (
        <>
        {!Auth.loggedIn() && window.location.replace("/login")}
            <div className="container mt-4">
                <div className="row">
                    <div id="navSection" className="col-3">
                        <Tabs />
                    </div>
                    <div id="contentSection" className="col-6">
                        <CreatePost />
                        <Post />
                        <ImagePost />
                    </div>
                    <div id="trendSection" className="col-3">
                        <TopTrends />
                    </div>
                </div>
            </div>
        </>
    )
};

export default Home;