import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

function Header() {
    return (
        <header className="header">
            <Link style={{display: "contents",}} to="/">
                <img className="header__img" src="chime-logos/chime-right.svg" alt="Chime" />
                <h1 className="header__text">Chime</h1>
            </Link>
        </header>
    )
}

export default Header
