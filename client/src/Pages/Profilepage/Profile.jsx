import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';
import Tabs from '../../Components/TabSection/Tabs';
import TopTrends from '../../Components/WhatsHappening/TopTrends';
import UserBio from '../../Components/UserBio/UserBio';
import UserPost from '../../Components/PostContainer/SingleUserPost';
import FollowBtn from '../../Components/FollowBtn/FollowBtn';

import './Profile.css';

function Profile() {
    const userId = Auth.getProfile().data._id;

    const { data } = useQuery(QUERY_ME, { fetchPolicy: 'cache-and-network' });

    const user = data?.me || {};

    return (
        <>
        <div className="container mt-4">
                <div className="row">
                    <div id="navSection" className="col-3">
                        <Tabs />
                    </div>
                    <div id="contentSection" className="col-6">
                        <UserBio />
                        <UserPost  />
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