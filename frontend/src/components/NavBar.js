import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {

    const navStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
        fontWeight: 'bold',
        padding: '10px',
        borderRadius: '5px'
    };

    const linkStyle = {
        color: 'black',
        textDecoration: 'none',
        padding: '10px 20px',
        margin: '0 10px',
        borderRadius: '5px',
    };

    return (
        <nav style={navStyle}>
            <Link to="/" style={linkStyle}>Home  </Link>
            <Link to="/trips" style={linkStyle}>Trips  </Link>
            <Link to="/experiences" style={linkStyle}>Experiences </Link>
        </nav>
    );
}

export default Nav;
