import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { QUERY_POST } from '../../utils/queries';
import { LIKE_POST } from '../../utils/mutations';

function LikeBtn({ postId, initialLikes }) {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(false);
    const [likePost] = useMutation(LIKE_POST, {
        variables: { postId },
        onError: (error) => {
            console.error('Error liking post:', error);
        },
        update: (cache, { data: { likePost } }) => {
            setLikes(likePost.likes.length); 
            setLiked(true);
        },
    });

    const handleLike = () => {
        likePost();
        window.location.reload();
    };
   

    return (
        <>
           <button className='btn btn-dark' onClick={handleLike} disabled={liked}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                </svg>
                <span>{likes}</span>
            </button>
        </>
    )
};

export default LikeBtn;