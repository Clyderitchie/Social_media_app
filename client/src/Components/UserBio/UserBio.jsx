import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';

import Auth from '../../utils/auth';
import EditBio from './EditBio';
import FollowBtn from '../FollowBtn/FollowBtn';

import './UserBio.css';

function UserBio() {
    // const userId = Auth.getProfile().data._id;

    const  { userId } = useParams();


    const { data } = useQuery(QUERY_USER, { variables: { userId }, fetchPolicy: "cache-and-network" });

    const user = data?.getUser || {};
    console.log("UserBio user: ", user);

    // Passing userId as a prop from PROFILE and using QUERY_USER 
    // I am returning the correct data for username

    // TODO: Fix the bio issue with not reading text, location, website, and birthday

    return (
        <>
            <div className="card">
                <img src="https://placehold.co/600x200" alt="Profile Header" />
                <img id="profilePic" className="rounded-circle" src="https://placehold.co/10x10" alt="Profile Picture" />
                <div className="d-flex justify-content-end">
                    <EditBio />
                </div>
                <div className="card-body">
                    <div className="d-flex justify-content-start align-items-center">
                        <h1 className='bioData'>{user.username}</h1>
                        <span className='bioData'>
                            <FollowBtn />
                        </span>
                    </div>
                    <div className="d-flex justify-content-start">
                        {/* {user.bio.text} */}
                        {/* <h6 className='bioData'>{user.bio.text}</h6>
                        <p className="bioData">{user.bio.website}</p> */}
                    </div>
                    <div className="d-flex justify-content-start">
                        {/* <p className='bioData'>Location: {user.bio.location}</p>
                        <p className="bioData">Birthday: {user.bio.birthday}</p> */}
                    </div>
                    <a className="text-decoration-none text-dark ms-3" href="#">Following</a>
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