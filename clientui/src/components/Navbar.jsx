import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Link } from 'react-router-dom';
import { House } from 'react-bootstrap-icons';
import AuthService from '../API/auth';
import { useState, useEffect } from 'react';


export default function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in on component mount
        const checkLoginStatus = () => {
            const token = AuthService.getToken();
            setIsLoggedIn(token ? true : false);
        };
        checkLoginStatus();
    }, []);

    return (
        <>
            <Navbar className='backGroundColor' data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand as={Link} to='/'>
                        PBS
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to='/'>
                            <House color='white' size={30} />   
                        </Nav.Link>
                        <Nav.Link as={Link} to='/stimuli'>Stimuli</Nav.Link>
                        <Nav.Link as={Link} to='/stimsets'>Sets</Nav.Link>
                        {isLoggedIn ? (
                            <Nav.Link onClick={AuthService.logout}>Sign Out</Nav.Link>
                        ) : (
                            <Nav.Link as={Link} to='/login'>Sign In</Nav.Link>
                        )}
                        
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}