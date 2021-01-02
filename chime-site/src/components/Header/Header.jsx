import React from 'react';
import './Header.scss';
import { Navbar, Nav } from 'react-bootstrap';

function Header() {
    return (

        <Navbar
            className="header"
            sticky="top"
            bg="light"
            expand="md"
            collapseOnSelect
        >
            <Navbar.Brand
                href="/"
                className="header__text d-flex align-items-center"
            >
                <img
                    className="header__img mx-3"
                    src="chime-logos/chime-right.svg"
                    alt=""
                />
                Chime
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav.Link className="px-3" href="#">About</Nav.Link>
                    <Nav.Link className="px-3" href="#">Campaigns</Nav.Link>
                    <Nav.Link className="px-3" href="#">Manage</Nav.Link>
                </Nav>
                <div className="ml-auto">
                    Account info
                </div>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header
