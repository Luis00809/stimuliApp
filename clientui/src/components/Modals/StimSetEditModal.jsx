import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { ArrowRight, PencilFill, Trash } from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { getOneStimSet, removeStimuliFromSet, updateStimSet} from '../../API/StimSetApi';

export default function EditStimSet(
    {
    id,
    closeModal
}) {
    const [oneSet, setSet] = useState();
    const [stimSetTitle, setTitle] = useState('');
    const [setStimuli, setSetStimuli] = useState([]);

    useEffect(() => {
        const fetchOneSet = async () => {
            try {
                const set = await getOneStimSet(id);
                setSet(set);
                console.log(set)
                // setTitle(set.title); 
                // setSetStimuli(set.stimuli)
            } catch (error) {
                console.log("error getting stimuil set: ", error);
            }
        };
        fetchOneSet();
    }, [id]);


    const handleModal = () => {
        setModal(true);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const removeStim = async (stimuliId, setId) => {
        try {
            await removeStimuliFromSet(stimuliId, setId)
            const updatedSet = await getOneStimSet(setId);
            setSetStimuli(updatedSet.stimuli);
        } catch (error) {
            console.log("error in removing stimuli from stim set: ", error);
        }
    }

    const handleSubmit = async (event, id) => {
        event.preventDefault(); 
        try {
            console.log(id)
            await updateStimSet(id, { title: stimSetTitle });
            // const updatedSet = await getOneStimSet(id);
            // setTitle(updatedSet.title)
            // Optionally, you can refresh the stimuli list or update the state here
        } catch (error) {
            console.log("error updating stim set title: ", error);
        }
    }



    return (
        <div>
            {oneSet && (
                <Card style={{ width: '25rem' }}>
                    <Container fluid>
                        <Row>
                                <Col xs={8}>
                                    <Card.Title>{stimSetTitle}</Card.Title>
                                </Col>
                        </Row>
                        <Row>
                                <Col>
                                    <ListGroup className="list-group-flush">
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text>Stimuli Set Title:</InputGroup.Text>
                                                <Form.Control
                                                type='text'
                                                value={stimSetTitle}
                                                onChange={handleTitleChange}
                                                />
                                        </InputGroup>
                                    </ListGroup>
                                </Col>
                        </Row>
                        <Row>
                        {setStimuli.map((stimuli, index) => (
                                <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-2">
                                    <Row>
                                        <Col>{stimuli.name}</Col>
                                        <Col xs="auto">
                                            <Button variant="danger" onClick={() => removeStim(stimuli.id, id)}>
                                                <Trash />
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            ))}
                            
                        </Row>
                        
                        <Row>
                            <Col>
                                <form onSubmit={(event) => handleSubmit(event, id)}>
                                    <Button type="submit" variant="success">Update Title</Button>
                                </form>
                            </Col>
                            <Col>
                                <Button onClick={closeModal}>Close</Button>
                            </Col>
                        </Row>
                    </Container>
                </Card>
            )}

        </div>
    )
}