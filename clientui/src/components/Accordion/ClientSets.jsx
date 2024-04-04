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
import { getStimSetsStimuli, removeStimuliFromSet } from "../../API/StimSetApi";
import { X } from "react-bootstrap-icons";
import { Plus } from "react-bootstrap-icons";

const DisplayUsersClientsSets = ({stimuliId}) => {

    const [clients, setClients] = useState([]);
    const [stimuliInSets, setStimuliInSets] = useState({});


    const fetchSets = async () => {
        try {
            const userId = await auth.getUserId();
            if (userId) {
                const usersClients = await getUsersClients(userId);
                setClients(usersClients);
                // Fetch stimuli for each stimset and update the state
                const stimuliInSets = {};
                for (const client of usersClients) {
                    for (const set of client.stimSets) {
                        const stimuli = await getStimSetsStimuli(set.id);
                        stimuliInSets[set.id] = stimuli.map(s => s.id);
                    }
                }
                setStimuliInSets(stimuliInSets);
            }
        } catch (error) {
            console.log("error getting Users clients");
        }
    }

    const handleAddingStimuliToSet = async (stimId, setId) => {
        try {
            const addingToSet = await addStimuliToSet(stimId, setId);
            if(addingToSet) {
                alert('added to set.');
                fetchSets();
            } else {
                alert('error adding to set.');
            }
        } catch (error) {
            console.log("error adding stimuli to set: ", error);
        }
    }

    const handleRemovingStimuliFromSet = async (stimId, setId) => {
        try {
            await removeStimuliFromSet(stimId, setId);
            alert('removed from set.');
            fetchSets();
        } catch (error) {
            console.log("error removing stimuli from stim set: ", error);
        }
    }

    useEffect(() => {
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
                            <Container style={{ paddingLeft: 0, paddingRight: 0, marginLeft: 0, marginRight: 0 }}>
                                <Row>
                                    {client.stimSets.map(set =>( 
                                        <Container key={set.id}>
                                            <Row className="border-bottom" >
                                                <Col xs={6}>
                                                    {set.title}
                                                </Col>
                                                <Col xs={6} className="my-2 ">
                                                            {stimuliInSets[set.id]?.includes(Number(stimuliId)) ? (
                                                                <Button className="rmvBtn" onClick={() => handleRemovingStimuliFromSet(stimuliId, set.id)}>
                                                                    <X />
                                                                </Button>
                                                            ) : (
                                                                <Button className="addBtns" onClick={() => handleAddingStimuliToSet(stimuliId, set.id)}>
                                                                    <Plus/>
                                                                </Button>
                                                            )}
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