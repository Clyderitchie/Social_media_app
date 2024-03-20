import React from 'react';
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_POST } from '../../utils/queries';
import { CREATE_COMMENT } from '../../utils/mutations';


function Comment({ postId }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [post, setPost] = useState(null);

    const { data } = useQuery(QUERY_POST, { variables: { postId }, fetchPolicy: 'cache-and-network' });

    const openModal = () => {
        if (data && data.getPost) {
            setPost(data.getPost);
            setModalOpen(true);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <button type="button" onClick={openModal} className="btn btn-dark" data-bs-toggle='modal' data-bs-target='#staticBackdrop'>
                Comment
            </button>

            {modalOpen && (
                <div className="modal fade show" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                                <button type="button" onClick={closeModal} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {post && (
                                    <div>
                                        <h2>{post.title}</h2>
                                        <p>{post.text}</p>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
};

export default Comment;