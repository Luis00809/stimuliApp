import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Trash } from 'react-bootstrap-icons';
import { getOneStimSet, removeStimuliFromSet, updateStimSet } from '../../API/StimSetApi';
import { useNavigate } from 'react-router-dom'; 
import { useParams } from "react-router-dom";

export default function EditStimSet({ id, show, closeModal, onRefresh }) {
    const [oneSet, setSet] = useState();
    const [stimSetTitle, setTitle] = useState('');
    const [setStimuli, setSetStimuli] = useState([]);
    const navigate = useNavigate();
    const [publicSet, setPublicSet] = useState(false)

    useEffect(() => {
        const fetchOneSet = async () => {
            try {
                const set = await getOneStimSet(id);
                setSet(set);
                setTitle(set.title || "");
                setSetStimuli(set.stimuli);
                setPublicSet(set.public)
            } catch (error) {
                console.log("error getting stimuli set: ", error);
            }
        };
        fetchOneSet();
    }, [id]);
    

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
        onRefresh();
    };

    const removeStim = async (stimuliId, setId) => {
        try {
            await removeStimuliFromSet(stimuliId, setId);
            const updatedSet = await getOneStimSet(setId);
            setSetStimuli(updatedSet.stimuli);
            onRefresh();
        } catch (error) {
            console.log("error in removing stimuli from stim set: ", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateStimSet(id, { title: stimSetTitle, public: publicSet });
            onRefresh();
            closeModal();
        } catch (error) {
            console.log("error updating stim set title: ", error);
        }
    };

    return (
        <Modal show={show} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Stimuli Set</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {oneSet && (
                    <Container fluid>
                        <Row>
                            <Col xs={8}>
                                <Card.Title>{stimSetTitle}</Card.Title>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
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
                            <Col className='mb-4'>
                                <Form>
                                    <Form.Check // prettier-ignore
                                        type="switch"
                                        id="custom-switch"
                                        label="Public"
                                        checked={publicSet}
                                        onChange={(e) => setPublicSet(e.target.checked)}

                                    />
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            {setStimuli.map((stimuli, index) => (
                                <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-2">
                                    <Row>
                                        <Col>{stimuli.stimName}</Col>
                                        <Col xs="auto">
                                            <Button variant="danger" onClick={() => removeStim(stimuli.id, id)}>
                                                <Trash />
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleSubmit}>Update Set</Button>
                <Button variant="secondary" onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
