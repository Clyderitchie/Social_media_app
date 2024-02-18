import { Link } from 'react-router-dom';
import Nav from './Nav';

import './Nav.css';

function Navbar() {

    return (
        <Nav 
            links ={[
                <Link key={1} className='dropdown-item bg-dark text-light' to="/">
                    Profile
                </Link>,
                <Link key={2} className='dropdown-item bg-dark text-light' to="/">
                    Notifications
                </Link>,
                <Link key={3} className='dropdown-item bg-dark text-light' to="/">
                    Messages
                </Link>,
                <Link key={4} className='dropdown-item bg-dark text-light' to="/">
                    Settings
                </Link>
            ]}
        />
    )
};

export default Navbar;