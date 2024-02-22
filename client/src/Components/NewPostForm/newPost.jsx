import React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../../utils/mutations';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Post from '../PostButton/Post';
import Tabs from '../TabSection/Tabs';
import TopTrends from '../WhatsHappening/TopTrends';

import './NewPost.css';

function NewPost() {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location
    const { userId } = state;
    const [text, setText] = useState('');
    const [addPost, { error }] = useMutation(CREATE_POST);

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await addPost({
                variables: { userId, text }
            });
            console.log("New post: ", data);
            setText('');
            navigate('/');
        } catch (err) {
            console.log("Create Post Error: ", err);
        }
    }

    return (
        <>

            <div className="container mt-4">
                <div className="row">
                    <div id="navSection" className="col-3">
                        <Tabs />
                    </div>
                    <div id="contentSection" className="col-6">
                        <input id="newPostInput" type="text" className="form-control" placeholder="Post" onSubmit={handlesubmit} value={text} onChange={(e) => setText(e.target.value)} />
                        <button type="submit" className='btn btn-dark rounded-pill'>Post</button>
                    </div>
                    <div id="trendSection" className="col-3">
                        <TopTrends />
                    </div>
                </div>
            </div>
        </>
    )

};

export default NewPost;