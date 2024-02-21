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
                            <div className="card-body">
                                <h1>{user.username}</h1>
                                <h6>{user.bio.text} {user.bio.website}</h6>
                                <p>{user.bio.location} {user.bio.birthday}</p>
                                edit profile, follower, following 
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