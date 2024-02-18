function TabGroup({ links }) {

    return (
        <>
            <ul >
                {links.map((link) => link)}
                
            </ul>
        </>
    )
};

export default TabGroup;