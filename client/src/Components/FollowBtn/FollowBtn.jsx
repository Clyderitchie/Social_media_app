import React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';

import { QUERY_ME } from '../../utils/queries';
import { FOLLOW_USER, UNFOLLOW_USER} from '../../utils/mutations';

function FollowBtn({ userId }) {
    const [followUser] = useMutation(FOLLOW_USER);
    const [unfollowUser] = useMutation(UNFOLLOW_USER);
    const { data: meData } = useQuery(QUERY_ME);

    const handleFollow = async () => {
        try {
            await followUser({ variables: { userId } });
        } catch (error) {
            console.error('Error following user:', error);
        }
    };

    const handleUnfollow = async () => {
        try {
            await unfollowUser({ variables: { userId } });
        } catch (error) {
            console.error('Error unfollowing user:', error);
        }
    };

    if (!meData || !meData.me || !meData.me.following) {
        return null; // Loading or error state
    }

    const isFollowing = meData.me.following.includes(userId);
    console.log("Follow Btn: ", isFollowing)

    return (
        <button type='button' className='btn btn-dark' onClick={isFollowing ? handleUnfollow : handleFollow}>
            {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
    );
};

export default FollowBtn;