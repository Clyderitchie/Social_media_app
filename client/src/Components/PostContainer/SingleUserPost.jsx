import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries'

import Auth from '../../utils/auth';
import LikeBtn from '../LikeButton/LikeBtn';

function UserPost() {

    const  { userId } = useParams();

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
                        <div className="d-flex justify-content-start">
                            <p id="postCreatedAt">{post.createdAt}</p>
                        </div>
                        <div className="d-flex justify-content-center">
                            <LikeBtn postId={post._id} initialLikes={post.likes.length} />
                        </div>
                    </div>
            </div>
           ))}

        </>
    )
};

export default UserPost;