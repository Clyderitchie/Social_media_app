import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { CREATE_POST } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

import './PostStyle.css';

function CreatePost() {
    const userId = Auth.getProfile().data._id;
    // console.log("Create post: ", userId);
    const navigate = useNavigate();
    const location = useLocation();
    const [text, setText] = useState('');
    const [addPost, { error }] = useMutation(CREATE_POST);

    const { data: userData } = useQuery(QUERY_ME, { fetchPolicy: 'cache-and-network' });
    const user = userData?.me || {};
    // console.log("Create post QUERY_ME: ", user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await addPost({
                variables: { text }
            });
            // console.log("New post: ", data);
            setText('');
            navigate('/home');
        } catch (err) {
            console.log("Create Post Error: ", err);
        }
    }

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <div id="createPostBody" className="card createPost">
                    <div className="d-flex justify-content-start">
                        <h2 id="usernameHomepage">{user.username}</h2>
                    </div>
                    <div id="newPostContainer" className="d-flex justify-content-start mt-2">
                        <input id="newPost" type="text" className="form-control form-control-lg rounded-pill" placeholder="What's going on?" value={text} onChange={(e) => setText(e.target.value)} />
                    </div>
                    <div id="newPostBtn" className="d-flex justify-content-end mt-3">
                        <button type="submit" className="btn btn-dark rounded-pill w-25">Post</button>
                    </div>
                </div>
            </form>
        </>
    )
};

export default CreatePost;