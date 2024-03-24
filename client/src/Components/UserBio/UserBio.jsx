import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';

import { useLocation } from 'react-router-dom';

import Auth from '../../utils/auth';
import EditBio from './EditBio';
import FollowBtn from '../FollowBtn/FollowBtn';

import './UserBio.css';

function UserBio({ userId }) {

    const loggedInUserId = Auth.getProfile().data._id;

    const { data } = useQuery(QUERY_USER, { variables: { userId }, fetchPolicy: "cache-and-network" });

    const user = data?.getUser || {};
    
    const location = useLocation();

    const isCurrentUser = loggedInUserId === userId;

    const isProfileRoute = location.pathname === '/profile';

    return (
        <>
            <div className="card">
                <img src="https://placehold.co/600x200" alt="Profile Header" />
                <img id="profilePic" className="rounded-circle" src="https://placehold.co/10x10" alt="Profile Picture" />
                <div className="d-flex justify-content-end">
                   {isCurrentUser && isProfileRoute &&  <EditBio />}
                </div>
                <div className="card-body">
                    <div className="d-flex justify-content-start align-items-center">
                        <h1 className='bioData'>{user.username}</h1>
                        <span className='bioData'>
                            {!!!isCurrentUser && isProfileRoute && <FollowBtn />}
                        </span>
                    </div>
                    <div className="card-body">
                    <h6>{user.bio ? user.bio.text : 'Bio not available'}</h6>
                    </div>
                    <a className="text-decoration-none text-dark ms-3" href="">Following</a>
                    <a className="text-decoration-none text-dark ms-5" href="#">Followers</a>
                    <ul className="nav nav-underline mt-4">
                        <li className="nav-item ProfileTabs">
                            <a href="#" aria-current="page" className="nav-link text-dark">Posts</a>
                        </li>
                        <li className="nav-item ProfileTabs">
                            <a href="#" aria-current="page" className="nav-link text-dark">Replies</a>
                        </li>
                        <li className="nav-item ProfileTabs">
                            <a href="#" aria-current="page" className="nav-link text-dark"> Media</a>
                        </li>
                        <li className="nav-item ProfileTabs">
                            <a href="#" aria-current="page" className="nav-link text-dark"> Likes</a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
};

export default UserBio;