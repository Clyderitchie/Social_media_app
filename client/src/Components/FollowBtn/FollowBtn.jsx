import React from 'react';
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';

import { QUERY_ME } from '../../utils/queries';
import { FOLLOW_USER, UNFOLLOW_USER } from '../../utils/mutations';

function FollowBtn({ userId }) {
    const [isFollowing, setIsFollowing] = useState(false);
    const { data: meData, loading, error } = useQuery(QUERY_ME);

    const [followUser] = useMutation(FOLLOW_USER);
    const [unfollowUser] = useMutation(UNFOLLOW_USER);

    useEffect(() => {
        console.log('meData:', meData);
        if (!loading && !error && meData && meData.me && meData.me.following) {
            console.log('Following:', meData.me.following);
            setIsFollowing(meData.me.following.some(user => user._id === userId));
            if (meData.me.following.some(user => user._id === userId)) {
                console.log(`Is following user with ID ${userId}`);
            } else {
                console.log(`Is not following user with ID ${userId}`);
            }
        }
    }, [meData, userId, loading, error]);

    const handleFollow = async () => {
        try {
            await followUser({ variables: { userId } });
            setIsFollowing(true);
            window.location.reload();
        } catch (error) {
            console.error('Error following user:', error);
        }
    };

    const handleUnfollow = async () => {
        try {
            await unfollowUser({ variables: { userId } });
            setIsFollowing(false);
            window.location.reload();
        } catch (error) {
            console.error('Error unfollowing user:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            {isFollowing ? (
                <button className="btn btn-dark" onClick={handleUnfollow}>
                    Unfollow
                </button>
            ) : (
                <button className="btn btn-dark" onClick={handleFollow}>
                    Follow
                </button>
            )}

        </>
    );
}

export default FollowBtn;