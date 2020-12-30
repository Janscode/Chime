import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import Navbar from './Navbar/Navbar';

function Header(props) {
    return (
        <header className="header">
            <Link className="header__text" style={{display: "flex",}} to="/">
                <img className="header__img" src="chime-logos/chime-right.svg" alt="Chime" />
                <h1>Chime</h1>
            </Link>
            <Navbar />
        </header>
    )
}

export default Header
