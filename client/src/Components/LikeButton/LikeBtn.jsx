import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { QUERY_POST } from '../../utils/queries';
import { LIKE_POST } from '../../utils/mutations';

function LikeBtn({ postId, initialLikes }) {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(false);
    const [likePost] = useMutation(LIKE_POST, 
        // { refetchQueries: ['getAllPosts'] },
        { variables: { postId },
        onError: (error) => {
            console.error('Error liking post:', error);
        },
        update: (cache, { data: { likePost } }) => {
            const cachedPost = cache.readQuery({
                query: QUERY_POST,
                variables: { postId },
            });
            if (cachedPost) {
                cache.writeQuery({
                    query: QUERY_POST,
                    variables: { postId },
                    data: {
                        getPost: {
                            ...cachedPost.getPost,
                            likes: likePost.likes,
                        },
                    },
                });
                setLikes(likePost.likes.length);
                setLiked(true);
            }
        },
    });

    const handleLike = () => {
        likePost();
    };

    return (
        <>
            <button className='btn btn-dark' onClick={handleLike} disabled={liked}>
                Like
            </button>
            <span>{likes} Likes </span>
        </>
    )
};

export default LikeBtn;