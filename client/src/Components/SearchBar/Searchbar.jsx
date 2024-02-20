import './Searchbar.css'

function Searchbar(){

    return(
        <>
        <div className="container ">
            <div className='d-flex justify-content-center w-100'>
                <input id="searchBar" type="text" className="form-control rounded-pill" placeholder="Search" />
            </div>
        </div>
        </>
    )
}

export default Searchbar;