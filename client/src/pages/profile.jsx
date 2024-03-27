import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

import { useLocation } from 'react-router-dom'

import Auth from '../utils/auth';
import Tabs from '../Components/TabSection/Tabs';
import  Trends from '../Components/Trends/TrendLayout';
import UserBio from '../Components/UserBio/UserBio';
import UserPost from '../Components/PostContainer/SingleUserPost';

function Profile({ userId, otherProfileUserId, activeUserId }) {

    const location = useLocation();
    const { state } = location;
    
    const profileUserId =
        otherProfileUserId || activeUserId || state?.userId;
        
    const { data } = useQuery(QUERY_USER,
        {
            variables: { userId: profileUserId },
            fetchPolicy: "cache-and-network"
        });

    const user = data?.getUser || {};
    
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
                    <Trends userId={userId}/>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Profile;