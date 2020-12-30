import React, { useState } from 'react';
import './Navbar.scss';
import { navbar } from '../../../sample-data/navbar';
import { Link } from 'react-router-dom';

// Current max nav items is ~4 main items
// Hidden state makes this somewhat mobile friendly

function Navbar() {
    const [ hidden, sethidden ] = useState(true);

    let navbarStyle;

    if (!hidden) {
        navbarStyle = {display: "block"};
    } else {
        navbarStyle = null;
    }

    return (
        <>
            <ul className="navbar" style={navbarStyle}>
                {navbar.routes.map(route => {
                    return (
                        <li className="navbar__category" key={route.text} onClick={() => sethidden(true)}>
                            <Link className="navbar--text" to={route.route}>
                                {route.text}
                            </Link>
                            <ul>
                                {route.children && route.children.map(child => {
                                    return (
                                        <Link className="navbar--text" to={child.route}>
                                            <li className="navbar__category--item" key={child.text} onClick={() => sethidden(true)}>
                                                {child.text}
                                            </li>
                                        </Link>
                                    )
                                })}
                            </ul>
                        </li>
                    )
                })}
            </ul>
            <span className="menu-icon" onClick={() => sethidden(!hidden)}>
                ≡
            </span>
        </>
    )
}

export default Navbar
