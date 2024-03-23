import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { QUERY_ME } from '../../utils/queries';

import { useLocation } from 'react-router-dom'

import Auth from '../../utils/auth';
import Tabs from '../../Components/TabSection/Tabs';
import TopTrends from '../../Components/WhatsHappening/TopTrends';
import UserBio from '../../Components/UserBio/UserBio';
import UserPost from '../../Components/PostContainer/SingleUserPost';

import './Profile.css';

function Profile({ userId, otherProfileUserId }) {

    const location = useLocation();
    const { state } = location;
    
    console.log("Profile received userId: ", userId);
    console.log("Profile received otherProfileUserId coming from UserProfile Component: ", otherProfileUserId);
    console.log("state from location Profile: ", state)

    const profileUserId = userId || otherProfileUserId || state?.userId;


    const { data } = useQuery(QUERY_USER,
        {
            variables: { userId: profileUserId },
            fetchPolicy: "cache-and-network"
        });

    const user = data?.getUser || {};
    console.log("Profile user data: ", data);

    return (
        <>
            <div className="container mt-4">
                <div className="row">
                    <div id="navSection" className="col-3">
                        <Tabs userId={userId} />
                    </div>
                    <div id="contentSection" className="col-6">
                        <UserBio userId={profileUserId} />
                        <UserPost userId={profileUserId} />
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