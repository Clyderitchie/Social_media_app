import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS, QUERY_USER } from '../../utils/queries';

import Auth from '../../utils/auth';
import LikeBtn from '../LikeButton/LikeBtn';
import Comment from '../Coments/Comment';

import './PostStyle.css';

function Post({ userId }) {

    const location = useLocation();
    const [postsData, setPostsData] = useState([]);
    const loggedInUserId = Auth.getProfile().data._id;
    const { data, loading } = useQuery(QUERY_POSTS, { fetchPolicy: 'cache-and-network' });

    useEffect(() => {
        if (data && data.getAllPosts) {
            setPostsData(data.getAllPosts);
        }
    }, [data]);

    if (loading) {
        return <h3>Loading posts...</h3>;
    }

    return (
        <>
            {postsData.toReversed().map((post) => (
                <div id="postBody" className="card mb-4" key={post._id}>
                    <div className="card-body">
                        <div id="username" className="d-flex justify-content-start">
                            <h6>
                                @<Link id="postCreator" to={post.userId._id ===
                                    loggedInUserId ?
                                    {
                                        pathname: `/user/${post.userId._id}`,
                                        state: { activeUserId: post.userId._id }
                                    } :
                                    `/user/${post.userId._id}`}
                                    state={{ postUserId: post.userId._id }}
                                >
                                    {post.userId.username}
                                </Link>
                            </h6>
                        </div>
                        <div className="d-flex justify-content-center">
                            <p id="postText">{post.text}</p>
                        </div>
                        {post.imageUrl && (
                            <div className="d-flex justify-content-center">
                                <img className="rounded" src={post.imageUrl}
                                    alt="Post"
                                    style={{ maxWidth: '100%', height: 'auto' }} />
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

export default Post;