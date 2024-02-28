


function More() {

    return (
        <>
        <div className="btn-group dropup">
            <button type="button" className="btn btn-light text-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                More
            </button>
            <ul className="dropdown-menu">
                <li>
                    <a className="dropdown-item" href="#">Logout</a>
                </li>
            </ul>
        </div>
        </>
    )
};

export default More;