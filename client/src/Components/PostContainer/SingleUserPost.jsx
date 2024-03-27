import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries'

import Auth from '../../utils/auth';
import LikeBtn from '../LikeButton/LikeBtn';
import Comment from '../Coments/Comment';

function UserPost({ userId }) {

    // console.log('Single user post: ', userId);

    const { data } = useQuery(QUERY_USER, { variables: { userId }, fetchPolicy: 'cache-and-network' });

    const user = data?.getUser || {};

    return (
        <>
            {user.posts && user.posts.map((post) => (
                <div className="card mb-4" key={post._id}>
                    <div className="card-body">
                        <div className="d-flex justify-content-start">
                            <h6 id="postCreator">@{post.userId.username}</h6>
                        </div>
                        <div className="d-flex justify-content-center">
                            <p id="postText">{post.text}</p>
                        </div>
                        {post.imageUrl && ( // Conditionally render image if imageUrl exists
                            <div className="d-flex justify-content-center">
                                <img src={post.imageUrl} alt="Post" style={{ maxWidth: '100%', height: 'auto' }} />
                            </div>
                        )}
                        <div className="d-flex justify-content-start">
                            <p id="postCreatedAt">{post.createdAt}</p>
                        </div>
                        <div className="row">
                            <div className="col-2 d-flex justify-content-start align-items-start">
                                <div className=" ">
                                    <div>
                                        <LikeBtn postId={post._id} initialLikes={post.likes.length} />
                                    </div>

                                </div>
                            </div>
                            <div className="col-10 d-flex justify-content-end align-items-start">
                                <div className=''>
                                    <Comment postId={post._id} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </>
    )
};

export default UserPost;