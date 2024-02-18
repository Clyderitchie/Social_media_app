

function Nav({ links }) {

    return (
        <>
            <header className="bg-dark border border-bottom">
                <div id="navBar" className="container bg-dark">
                    <nav className="navbar navbar-expand-lg bg-dark">
                        <div className="container-fluid">
                            <h1 className="bolder">
                                <a className="text-decoration-none text-light" href="/">
                                    Teller App
                                </a>
                            </h1>
                            <div id="navDropdown" className="btn-group" role="group">
                                <button type="button" className="btn bg-dark btn-dark dropdown-toggle text-light" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    Explore
                                </button>
                                <ul className="dropdown-menu bg-dark">
                                    {links.map((link) => link)}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Nav;