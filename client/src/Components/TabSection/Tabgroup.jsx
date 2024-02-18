function TabGroup({ links }) {

    return (
        <>
            <ul>
                <li>{links.map((link) => link)}</li>
                
            </ul>
        </>
    )
};

export default TabGroup;