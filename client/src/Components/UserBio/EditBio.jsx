import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CREATE_BIO } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import './UserBio.css';

function EditBio() {
    const  { userId } = useParams();
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);
    // const [location, setLocation] = useState('');
    // const [website, setWebsite] = useState('');
    // const [birthday, setBirthday] = useState('');

    const [addBio] = useMutation(CREATE_BIO);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let profilePicture = null

            if (file) {
                const cloudName = 'dotzqy61r';
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'dgayr62l');
                formData.append('api_key', '443559482432498');

                const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                    method: 'POST',
                    body: formData
                });

                if (res.ok) {
                    const data = await res.json();
                    profilePicture = data.url;
                } else {
                    throw new Error('Failed to upload image.');
                }
            }
            const { data } = await addBio({
                variables: { userId, text, profilePicture }
            })
            navigate('/profile')

        } catch (err) {
            console.error('Error updating bio: ', err);
        }
    }

    return (
        <>
            <button type="button" className="btn btn-dark rounded-pill me-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Edit Bio
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Bio</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form action="input" onSubmit={handleSubmit}>
                            <div id="editBioModal" className="modal-body">
                                <div className="form-floating">
                                    <input
                                        className="form-control"
                                        type="file"
                                        placeholder="Choose a file"
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                </div>
                                <div className="form-floating">
                                    <textarea className="form-control mb-4 BioInput"
                                        id="floatingTextarea2"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                    ></textarea>
                                    <label for="floatingTextarea2">Text</label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default EditBio;