import { useState, useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { addClientToUser, removeClientFromUser, getUsersClients } from "../../API/UserApi";
import { getClients } from "../../API/ClientApi";
import { PersonFillAdd } from 'react-bootstrap-icons';
import { X } from "react-bootstrap-icons"; 
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

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
        <Accordion >
            <Accordion.Item eventKey="0">
                <Accordion.Header>Clients</Accordion.Header>
                <Accordion.Body style={{ paddingLeft: 0, paddingRight: 0, marginLeft: 0, marginRight: 0 }}>
                    <Container>
                        <Row >
                            
                            {clients.map(client => (
                              <Col xs={6}>
                                    <Card className="mb-3 " key={client.id}>
                                        <Card.Body className="d-flex justify-content-evenly">
                                            <Card.Text>{client.name} name</Card.Text>
                                            {userClientIds.includes(client.id) ? (
                                                <Button className="rmvBtn" onClick={() => removeClient(client.id, userId)}>
                                                    <X />
                                                </Button>
                                            ) : (
                                                <Button className="addBtns" onClick={() => addClient(client.id, userId)}>
                                                    <PersonFillAdd />
                                                </Button>
                                            )}
                                        </Card.Body>
                                    </Card>
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