import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';

import Auth from '../../utils/auth';
import Profile from '../Profilepage/Profile';

function UserProfile() {
    const userId = Auth.getProfile().data._id;

    const { data } = useQuery(QUERY_USER, { fetchPolicy: 'cache-and-network' });

    const user = data?.getUser || {};
    console.log("User from OtherUserProfile: ", user);

    return (
        <>
            <Profile />
        </>
    )
};

export default UserProfile;