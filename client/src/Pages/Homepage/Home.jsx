import React from 'react';

import Search from '../../Components/SearchBar/Searchbar';
import Tabs from '../../Components/TabSection/Tabs';

import './Home.css'

function Home () {

    return (
        <>
            <div className="container mt-4">
                <div className="row">
                    <div id="navSection" className="col-4">
                        <Tabs />
                    </div>
                    <div id="contentSection" className="col-4">
                            <h1>Post go here</h1>
                    </div>
                    <div id="trendSection" className="col-4">
                        <Search />
                    </div>
                </div>
            </div>
        </>
    )
};

export default Home;