import React from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries'

import Auth from '../../utils/auth';

function UserPost() {
    const userId = Auth.getProfile().data._id;

    const [postContext, setPostContext] = useState([]);
    const { data, loading } = useQuery(QUERY_ME, { fetchPolicy: 'cache-and-network' });

    useEffect(() => {
        if (data && data.me) {
            setPostContext(data.me);
        }
    }, [data]);

    if (loading) {
        return <h3>Loading users post....</h3>
    };

    return (
        <>
           {data.me.posts.map((post) => (
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
                    </div>
            </div>
           ))}

        </>
    )
};

export default UserPost;