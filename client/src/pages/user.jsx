import React from "react";
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

import Auth from '../utils/auth';
import Profile from './profile';

function UserProfile() {

    const location = useLocation();
    const { state } = location;
    const otherUserId = state?.postUserId;

    const { data } = useQuery(QUERY_USER,
        {
            variables: { userId: otherUserId },
            fetchPolicy: 'cache-and-network'
        });

    const user = data?.getUser || {};

    return (
        <>
            <Profile otherProfileUserId={otherUserId} />
        </>
    )
};

export default UserProfile;