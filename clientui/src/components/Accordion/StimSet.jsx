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

export default function DisplayStimSetList({
    stimId
}){
    const [stimSetList, setStimSetList] = useState([]);
    
    const handleAddingStimuli = async (stimId, setId) => {
        try {
            const intStimId = parseInt(stimId, 10);
            const intStimSetId = parseInt(setId, 10);

            console.log("stimuli id: ", intStimId)
            console.log("stim set id: ",intStimSetId)
            const request = await addStimuliToSet(intStimId, intStimSetId);
            if(request){
                alert('Added Stimuli to Set.');
                // setRefreshKey(prevKey => prevKey + 1);
            }
        } catch (error) {
            console.log("error addign stimuli to stim set: ", error);
        }
    }

    // might need to use useEffect so would adjust from below
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

    // getting a warning that each child in a list should have unique key prop
    return (
        <Accordion defaultActiveKey="0">
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
                                        <Button  onClick={() => handleAddingStimuli(stimId, stimSet.id)}>
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