import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

import './ActiveUser.css';

function ActiveUser() {

    const userId = Auth.getProfile().data._id;

    const { data } = useQuery(QUERY_ME, { fetchPolicy: 'cache-and-network' });

    const user = data?.me || {};
    console.log("User: ", data);

    return (
        <>
            <div className="container d-flex justify-content-around align-items-center">
                <img className="rounded-circle" src="https://placehold.co/80x80" alt="User Picture" />
                <div id="activeUser" className="card border rounded-pill mt-5">
                    <div className="card-body">
                        <h5>{user.username}</h5>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ActiveUser;