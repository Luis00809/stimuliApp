import React, { useState, useEffect } from 'react';
import ClientCard from '../components/Cards/ClientCard';
import { getUsersClients } from '../API/UserApi';
import auth from "../API/auth";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "../css/Homepage.css"

const Homepage = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const userId = await auth.getUserId();
                if (userId) {
                    const usersClients = await getUsersClients(userId);
                    setClients(usersClients); // Set the state with fetched clients
                } else {
                    console.log("error getting user id");
                }
            } catch (error) {
                console.log("error getting users clients: ", error);
            }
        };

        fetchClients();
    }, []); 

    return (
        <Container className="h-100 d-flex flex-column homeContainer">
            <Row className='mb-5 justify-content-center'>
                <Col className='text-center'>
                    <h1>Welcome to stimuli app!</h1>
                </Col>
            </Row>
            <Row className="justify-content-center cardBorder p-3 m-1 rounded-4 ">
                <Col>
                    <h2>My clients:</h2>
                </Col>
                <Col>
                    {clients.map(client => (
                        <ClientCard key={client.id} name={client.name} clientId={client.id} />
                    ))}
                </Col>
            </Row>
            
        </Container>
        
    );
}

export default Homepage;
