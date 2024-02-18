import { Link } from 'react-router-dom';
import TabGroup from './Tabgroup';

function Tabs() {

    return (
        <TabGroup links={[
            <Link key={1} className='text-decoration-none text-dark'>
                <li>Home</li>
            </Link>,
            <Link key={2} className='text-decoration-none text-dark'>
                <li>Explore</li>
            </Link>,
            <Link key={3} className='text-decoration-none text-dark'>
                <li>Notifications</li>
            </Link>,
            <Link key={4} className='text-decoration-none text-dark'>
                <li>Messages</li>
            </Link>,
            <Link key={5} className='text-decoration-none text-dark'>
               <li>Profile</li>
            </Link>,
            <Link key={6} className='text-decoration-none text-dark'>
                <li>More</li>
            </Link>
        ]} />
    )
};

export default Tabs;