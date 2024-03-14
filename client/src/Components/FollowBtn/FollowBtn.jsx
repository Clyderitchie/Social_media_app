import React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';

import { QUERY_ME } from '../../utils/queries';
import { FOLLOW_USER } from '../../utils/mutations';

function FollowBtn({ userIdToFollow }) {
    const [followUser] = useMutation(FOLLOW_USER);
    const { data: userData } = useQuery(QUERY_ME);

    const handleFollow = async () => {
        try {
            // Execute the FOLLOW_USER mutation
            const { data } = await followUser({
                variables: { userId: userIdToFollow }
            });

            // Update local state or perform any other actions as needed
            console.log("User followed:", data.followUser.username);
        } catch (error) {
            console.error("Failed to follow user:", error);
        }
    };


    return (
        <>
        <button type='button' className='btn btn-dark' onClick={handleFollow}>
            Follow
        </button>
        </>
    )
};

export default FollowBtn;