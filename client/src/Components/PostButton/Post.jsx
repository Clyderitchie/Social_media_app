import React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../../utils/mutations';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import './PostBtn.css';

function PostBtn() {
    const navigate = useNavigate();
    const location = useLocation();
    // const { state } = location
    // const { userId } = state;
    // console.log("userId: ", userId);
    // console.log("State: ", state);
    const [text, setText] = useState('');
    const [addPost, { error }] = useMutation(CREATE_POST);

    const handleSubmit = async (e) => {
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
            <button id="postBtn" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className='btn btn-dark rounded-pill'>
                Post
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Hello</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form id="newPostForm" className="form" onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <input id="newPostInput" type="text" className="form-label rounded-pill" placeholder="Post" value={text} onChange={(e) => setText(e.target.value)} />
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className='btn btn-dark rounded-pill'>Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
};

export default PostBtn;