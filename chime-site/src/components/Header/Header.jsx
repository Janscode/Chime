import React from 'react';
import './Header.scss';
import { Navbar, Nav, Container } from 'react-bootstrap';

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
                <Container>
                    <Nav className="m-auto">
                        <Nav.Link className="navigation-item px-3" href="#">About</Nav.Link>
                        <Nav.Link className="navigation-item px-3" href="#">Campaigns</Nav.Link>
                        <Nav.Link className="navigation-item px-3" href="#">Manage</Nav.Link>
                    </Nav>
                </Container>
                <div
                    className="text-right"
                >
                    Account info
                </div>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header
