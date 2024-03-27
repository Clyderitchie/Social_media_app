import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../../utils/queries';

import Auth from '../../utils/auth';

function Trends({ userId }) {

    const location = useLocation();
    const loggedInUserId = Auth.getProfile().data._id; 

    const { data, loading } = useQuery(QUERY_POSTS, { fetchPolicy: 'cache-and-network' });

    if (loading) {
        return <h3>Loading trending posts...</h3>;
    }

    if (!data || !data.getAllPosts || data.getAllPosts.length === 0) {
        return <h3>No trending posts available</h3>;
    }

    const sortedPosts = [...data.getAllPosts].sort((a, b) => {
        const metricA = a.likes.length + a.comments.length;
        const metricB = b.likes.length + b.comments.length;
        return metricB - metricA;
    });


    return (
        <div className="container">
            {sortedPosts.slice(0, 5).map((post) => (
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
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Trends;