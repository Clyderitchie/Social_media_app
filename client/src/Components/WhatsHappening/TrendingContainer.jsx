import './Trending.css'

function Trends({ links }){

    return (
        <>
        <div id="trendCard" className="card">
            <div className="card-body">
               <ul id="topTrends">
                {links.map((link) => link)}
               </ul>
            </div>
        </div>
        </>
    )
};

export default Trends;