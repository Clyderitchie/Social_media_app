import { Link } from 'react-router-dom';

import Trends from './TrendingContainer';

function TopTrends() {

    return (
        <Trends 
            links={[
                <Link key={1} className="text-decoration-none text-dark mt-3 ps-3" to="/">
                    Top Trending story
                </Link>,
                <Link key={2} className="text-decoration-none text-dark mt-3 ps-3" to="/">
                    Second top story
                </Link>,
                <Link key={3} className="text-decoration-none text-dark mt-3 ps-3" to="/">
                    Third top story
                </Link>,
                <Link key={4} className="text-decoration-none text-dark mt-3 ps-3" to="/">
                    Fourth top story
                </Link>,
                <Link key={5} className="text-decoration-none text-dark mt-3 ps-3" to="/">
                    Fifth top story
                </Link>
            ]}
        />
    )
};

export default TopTrends;