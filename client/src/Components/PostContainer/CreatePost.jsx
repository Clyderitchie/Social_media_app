import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { CREATE_POST } from '../../utils/mutations';
import { QUERY_ME,  } from '../../utils/queries';
import Auth from '../../utils/auth';

import './PostStyle.css';

function CreatePost() {
    const userId = Auth.getProfile().data._id;
    const navigate = useNavigate();
    const location = useLocation();
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);
    const [addPost, { error }] = useMutation(CREATE_POST, { refetchQueries: ['getAllPosts']});

    const { data: userData } = useQuery(QUERY_ME, { fetchPolicy: 'cache-and-network' });
    const user = userData?.me || {};
    console.log("Create post QUERY_ME: ", user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cloudName = 'dotzqy61r';
        const formData = new FormData();
        formData.set('file', file);
        formData.set('upload_preset', 'dgayr62l');
        formData.set('api_key', '443559482432498');
        const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData
        });

        if (cloudinaryResponse.ok) {
            const CloudinaryData = await cloudinaryResponse.json();
            console.log(CloudinaryData);
            try {
                const { data } = await addPost({
                    variables: { text, imageUrl: CloudinaryData.url }
                });
                console.log("New post: ", data);
                setText('');
                setFile(null);
                navigate('/home');
            } catch (err) {
                console.log("Create Post Error: ", err);
            }
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
                    <div id="fileInput" className="d-flex justify-content-start mt-2">
                        <input className="form-control rounded-pill" placeholder="Choose a file" type="file" onChange={(e) => setFile(e.target.files[0])} />
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