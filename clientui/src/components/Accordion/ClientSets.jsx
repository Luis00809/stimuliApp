import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import auth from "../../API/auth";
import { getUsersClients } from "../../API/UserApi";
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { addStimuliToSet } from "../../API/StimuliApit";

const DisplayUsersClientsSets = ({stimuliId}) => {

    const [clients, setClients] = useState([]);
    const handleAddingStimuliToSet = async ( stimId, setId) => {
        try {
            const addingToSet = await addStimuliToSet(stimId, setId)
            if(addingToSet) {
                alert('added to set.')
            } else {
                alert('error adding to set.')
            }
        } catch (error) {
            console.log("error adding stimuli to set: ", error);
        }
    }
    
    useEffect(() => {
        const fetchSets = async () => {
            try {
                const userId = await auth.getUserId();
                if (userId) {
                    const usersClients = await getUsersClients(userId);
                    setClients(usersClients)
                }
            } catch (error) {
                console.log("error getting Users clients");
            }
        }
        fetchSets();
    }, [])

    return (
        <Accordion>
            <Accordion.Item eventKey="0">
            <Accordion.Header>Client's Sets</Accordion.Header>
            <Accordion.Body>
                {clients.map(client => (
                    <Accordion key={client.id}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>{client.name}</Accordion.Header>
                        <Accordion.Body>
                            <Container>
                                <Row>
                                    {client.stimSets.map(set =>( 
                                        <Container key={set.id}>
                                            <Row>
                                                <Col>
                                                    {set.title}
                                                </Col>
                                                <Col>
                                                    <Button onClick={() => handleAddingStimuliToSet(stimuliId, set.id)}>add</Button>
                                                </Col>
                                            </Row>
                                        </Container>
                                        
                                    ))}
                                </Row>
                            </Container>
                        </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>
                ))}
            </Accordion.Body>
            </Accordion.Item>
            
        </Accordion>
    )
}

export default DisplayUsersClientsSets;