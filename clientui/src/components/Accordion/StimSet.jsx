import Accordion from 'react-bootstrap/Accordion';
import { getStimSet } from '../../API/StimSetApi';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { addStimuliToSet } from '../../API/StimuliApit';
import { Plus } from 'react-bootstrap-icons';
import { addSetToClient } from '../../API/ClientApi';

export default function DisplayStimSetList({
    id,
    actionType,
    onRefresh
}){
    const [stimSetList, setStimSetList] = useState([]);
    
    const handleAddingStimuli = async (id, setId) => {
        try {
            const intStimId = parseInt(id, 10);
            const intStimSetId = parseInt(setId, 10);

            const request = await addStimuliToSet(intStimId, intStimSetId);
            if(request){
                alert('Added Stimuli to Set.');
            }
        } catch (error) {
            console.log("error adding stimuli to stim set: ", error);
            if (error.message.includes("Cannot insert duplicate key in object")) {
                alert("This stimuli already exists in this set.");
            } else if (error.message.includes("The stimuli or stim set does not exist")) {
                alert("The stimuli or stim set does not exist.");
            } else {
                alert("An unexpected error occurred.")
            }
        }
    }

    const handleAddingSetToClient = async (clientId, setId) => {
        try {
            const addSet = await addSetToClient(clientId, setId);
            if (addSet) {
                alert("Added stimuli set to client.");
                onRefresh();
            }
        } catch (error) {
            console.log("error adding set to client: ", error);
            if(error){
                alert("This client already has this stim set")
                console.log(error);
            } else {
                alert('An unexpected error occurred.')
            }
        }
    }

    useEffect(() => {
        const getStimSets = async () => {
            try {
                const sets = await getStimSet();
                setStimSetList(sets);

            } catch (error) {
                console.log("Error fetching stimuli sets: ", error);
            }
        }
        getStimSets();
    }, []);

    return (
        <Accordion >
            <Accordion.Item eventKey="0">
                <Accordion.Header>Stimuli Sets</Accordion.Header>
                <Accordion.Body>
               {stimSetList.map(stimSet => (
                    <Card key={stimSet.id} style={{ width: '18rem' }}>
                        <Card.Body>
                            <Container>
                                <Row>
                                    <Col>
                                        <Card.Title>{stimSet.title}</Card.Title>
                                    </Col>
                                    <Col>
                                        <Button className="addBtns"  onClick={() => {
                                            if(actionType === 'addStimuli'){
                                                handleAddingStimuli(id, stimSet.id);
                                            } else if (actionType === 'AddSetToClient') {
                                                handleAddingSetToClient(id, stimSet.id)
                                            }
                                        }}>
                                            <Plus/>
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Body>
                    </Card>
               ))}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}