import React from 'react';
import { useState, useEffect } from 'react';

import { useMutation, useQuery } from '@apollo/client';

import { QUERY_POST } from '../../utils/queries';
import { CREATE_COMMENT } from '../../utils/mutations';

import './comment.css'

function Comment({ postId }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    const [text, setText] = useState('');

    const [addComment, { error }] = useMutation(CREATE_COMMENT);

    const { data } = useQuery(QUERY_POST, { variables: { postId }, fetchPolicy: 'cache-and-network' });

    useEffect(() => {
        if (data && data.getPost) {
            setPost(data.getPost);
            setComments(data.getPost.comments);
        }
    }, [data]);

    const openModal = () => {
        if (data && data.getPost) {
            setPost(data.getPost);
            setModalOpen(true);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!text.trim()) {
                console.error('Comment text cannot be empty.');
                return;
            }

            const { data } = await addComment({
                variables: { text, postId }
            });

            setComments([...comments, data.createComment]);
            setText('');
            closeModal();
        } catch (err) {
            console.error('Error creating comment: ', err);
        }
    }

    return (
        <>
            <div className="row mt-3">
            <div className="col">
                <button className="btn btn-dark" type="button" data-bs-toggle="collapse" data-bs-target={`#commentCollapse_${postId}`} aria-expanded="false" aria-controls={`commentCollapse_${postId}`}>
                    Comment
                </button>
                <div className="collapse mb-3" id={`commentCollapse_${postId}`}>
                    <div className="card mt-3">
                        <div className="card-body" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {comments.map((comment, index) => (
                                <div className="card card-body mb-3 w-100" key={index}>
                                    <div className="d-flex justify-content-start">
                                        {comment.userId.username}
                                    </div>
                                    <div className="d-flex justify-content-center align-item-center">
                                        {comment.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="card-footer">
                            <form onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Add a comment..." value={text} onChange={(e) => setText(e.target.value)} />
                                    <button className="btn btn-dark" type="submit">Post</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
};

export default Comment;