import React from 'react';
import { useState } from 'react';
import { CREATE_BIO } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import './UserBio.css';

function EditBio({ userId }) {

    const navigate = useNavigate();
    const [text, setText] = useState('');
    const [location, setLocation] = useState('');
    const [website, setWebsite] = useState('');
    const [birthday, setBirthday] = useState('');

    const [addBio] = useMutation(CREATE_BIO);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await addBio({
                variables: { userId, text, location, website, birthday }
            })
            navigate('/profile')
        } catch (err) {
            console.log("Update bio error: ", err);
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
                                    <textarea className="form-control mb-4 BioInput" 
                                    id="floatingTextarea2"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    ></textarea>
                                    <label for="floatingTextarea2">Text</label>
                                </div>
                                <div className="form-floating">
                                    <textarea className="form-control mb-4 BioInput" 
                                    id="floatingTextarea3"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                    ></textarea>
                                    <label for="floatingTextarea3">Website</label>
                                </div>
                                <div className="form-floating">
                                    <textarea className="form-control mb-4 BioInput" 
                                    id="floatingTextarea4"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    ></textarea>
                                    <label for="floatingTextarea4">Location</label>
                                </div>
                                <div className="form-floating">
                                    <textarea className="form-control mb-4 BioInput" 
                                    id="floatingTextarea5"
                                    value={birthday}
                                    onChange={(e) => setBirthday(e.target.value)}
                                    ></textarea>
                                    <label for="floatingTextarea5">Birthday</label>
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