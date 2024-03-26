import { useState, useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { addClientToUser, removeClientFromUser, getUsersClients } from "../../API/UserApi";
import { getClients } from "../../API/ClientApi";

const UsersClients = ({userId}) => {

    const [clients, setClients] = useState([]);
    const [userClients, setUserClients] = useState([]);
    const [triggerUpdate, setTriggerUpdate] = useState(false);

    useEffect(() => {
        const fetchUsersClients = async () => {
            try {
                const usersClients = await getUsersClients(userId);
                setUserClients(usersClients);
            } catch (error) {
                console.log("error getting clients");
            }
        }
        fetchUsersClients();
    }, [userId, triggerUpdate])

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const allClients = await getClients();
                setClients(allClients);
            } catch (error) {
                console.log("error getting clients");
            }
        }
        fetchClients();
    },[])

    const userClientIds = userClients.map(client => client.id);


    const addClient = async (clientId, userId) => {
       
        try {
            const response = await addClientToUser(clientId, userId);
            setTriggerUpdate(prev => !prev);
        } catch (error) {
            console.log("error adding client");
        }
    }

    const removeClient = async (clientId, userId) => {
        
        try {
            const response = await removeClientFromUser(clientId, userId)
            setTriggerUpdate(prev => !prev);
        } catch (error) {
            console.log("error removing client from User");
        }
    }

    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Clients</Accordion.Header>
                <Accordion.Body>
                    <Container>
                        <Row>
                            {clients.map(client => (
                                <Col xs={12} key={client.id}>
                                    <p>{client.name}</p>
                                    {userClientIds.includes(client.id) ? (
                                        <Button variant="primary" onClick={() => removeClient(client.id, userId)}>Remove</Button>
                                    ) : (
                                        <Button variant="primary" onClick={() => addClient(client.id, userId)}>Add</Button>
                                    )}
                                </Col>
                            ))}
                            
                        </Row>
                    </Container>
                </Accordion.Body>
            </Accordion.Item>
        
        </Accordion>
    )
};

export default UsersClients;