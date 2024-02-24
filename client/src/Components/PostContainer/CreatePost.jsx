import React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../../utils/mutations';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function CreatePost() {
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
                variables: { text }
            });
            console.log("New post: ", data);
            setText('');
            navigate('/home');
        } catch (err) {
            console.log("Create Post Error: ", err);
        }
    }

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <div className="card createPost">
                    <input id="newPost" type="text" className="form-control form-control-lg" placeholder="What's going on?" value={text} onChange={(e) => setText(e.target.value)} />
                    <button type="submit" className="btn btn-dark rounded-pill w-25">Post</button>
                </div>
            </form>
        </>
    )
};

export default CreatePost;