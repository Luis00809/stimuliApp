import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Link } from 'react-router-dom';
import { House } from 'react-bootstrap-icons';


export default function NavBar() {
    return (
        <>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand as={Link} to='/'>
                        PBS
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to='/'>
                            <House color='white' size={30} />   
                        </Nav.Link>
                        <Nav.Link as={Link} to='/'>Features</Nav.Link>
                        <Nav.Link as={Link} to='/'>Pricing</Nav.Link>
                        
                        
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}