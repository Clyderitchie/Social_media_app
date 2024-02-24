import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';
import Tabs from '../../Components/TabSection/Tabs';
import TopTrends from '../../Components/WhatsHappening/TopTrends';

import './Profile.css';

function Profile() {
    const userId = Auth.getProfile().data._id;

    const { data } = useQuery(QUERY_ME, { fetchPolicy: 'cache-and-network' });

    const user = data?.me || {};
    console.log("User: ", data);

    return (
        <>
        <div className="container mt-4">
                <div className="row">
                    <div id="navSection" className="col-3">
                        <Tabs />
                    </div>
                    <div id="contentSection" className="col-6">
                        <div className="card">
                            <img src="https://placehold.co/600x200" alt="Profile Header" />
                            <img id="profilePic" className="rounded-circle" src="https://placehold.co/10x10" alt="Profile Picture" />
                            <div className="d-flex justify-content-end">
                            <button id="editProfileBtn" className='btn btn-dark rounded-pill'>Edit profile</button>
                            </div>
                            <div className="card-body">
                                <h1>{user.username}</h1>
                                {/* <h6 className='bioData'>{user.bio.text} {user.bio.website}</h6> */}
                                {/* <p className='bioData'>{user.bio.location} {user.bio.birthday}</p> */}
                                <a className="text-decoration-none text-dark ms-3" href="#">Following</a>
                                <a className="text-decoration-none text-dark ms-5" href="#">Followers</a>
                                <ul className="nav nav-underline mt-4">
                                    <li className="nav-item ProfileTabs">
                                        <a href="#" aria-current="page" className="nav-link text-dark">Posts</a>
                                    </li>
                                    <li className="nav-item ProfileTabs">
                                    <a href="#" aria-current="page" className="nav-link text-dark">Replies</a> 
                                    </li>
                                    <li className="nav-item ProfileTabs">
                                    <a href="#" aria-current="page" className="nav-link text-dark"> Media</a>
                                    </li>
                                    <li className="nav-item ProfileTabs">
                                    <a href="#" aria-current="page" className="nav-link text-dark"> Likes</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div id="trendSection" className="col-3">
                        <TopTrends />
                    </div>
                </div>
            </div>
        </>
    )
};

export default Profile;