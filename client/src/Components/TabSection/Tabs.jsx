import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

import TabGroup from './Tabgroup';
import PostBtn from '../PostButton/Post';
import ActiveUser from '../AciveUser/ActiveUser';
// import More from '../MoreSection/MoreBtn';

import'./Tabs.css';

function Tabs(props) {
    const { logout } = props;

    return (
        <TabGroup links={[
            <Link key={1} id="tabGroup" className='text-decoration-none text-dark' to="/home" state= {{userId: Auth.getProfile().data._id}}>
                <li className='tabList'>Home</li>
            </Link>,
            <Link key={2} className='text-decoration-none text-dark'>
                <li className='tabList'>Explore</li>
            </Link>,
            <Link key={3} className='text-decoration-none text-dark'>
                <li className='tabList'>Notifications</li>
            </Link>,
            <Link key={4} className='text-decoration-none text-dark'>
                <li className='tabList'>Messages</li>
            </Link>,
            <Link key={5} className='text-decoration-none text-dark' to='/profile'>
               <li className='tabList'>Profile</li>
            </Link>,
            <Link key={6} className='text-decoration-none text-dark' to="/" onClick={logout}>
                <li className='tabList'>Logout</li>
            </Link>,
            <Link key={7} className='postBtn' state= {{userId: Auth.getProfile().data._id}} >
                {/* <PostBtn /> */}
            </Link>,
            <ActiveUser />
        ]} />
    )
};

export default Tabs;