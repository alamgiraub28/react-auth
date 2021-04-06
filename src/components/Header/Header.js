import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import css from './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <Container  >
                <Navbar  expand="lg">
                    <Link to="/"><Navbar.Brand href="#home" className="text-light">TravelHub</Navbar.Brand></Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav" className="main-menu">
                        <Nav className="p-1">
                            <Link to="/"><Nav.Link href="#home">Home</Nav.Link></Link>
                            <Link to="/notFound"><Nav.Link href="#link">Destination</Nav.Link></Link>
                            <Link to="/notFound"><Nav.Link href="#link">Blog</Nav.Link></Link>
                            <Link to="/notFound"><Nav.Link href="#link">Contact</Nav.Link></Link>
                            <Nav.Link href="#link"> <FontAwesomeIcon className="text-light" icon={faUser} /> {loggedInUser.name || loggedInUser.displayName}</Nav.Link>
                        </Nav>
                        <Link to="/login"><Button variant="primary">Login</Button></Link>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
    );
};

export default Header;