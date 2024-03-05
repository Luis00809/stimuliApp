import StimuliCard from "../components/Cards/StimuliCard";
import { useState, useEffect } from 'react';
import { getAllStimuli } from "../API/StimuliApit";
import { useNavigate } from 'react-router-dom';
import { createStimuli } from "../API/StimuliApit";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { PlusCircle } from 'react-bootstrap-icons';



const StimuliPage = () => {
    const [stimuli, setStimuli] = useState([]);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [createStimTitle, setStimTitle] = useState('');
    const [refreshKey, setRefreshKey] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSettingTitle = (event) => {
        setStimTitle(event.target.value)
    };

    const handleCreatingStimuli = async (event, createStimTitle) => {
        event.preventDefault();

        try {
            const creatingStimuli = await createStimuli({name: createStimTitle})
            if(createStimuli) {
                handleClose();
                setRefreshKey(prevKey => prevKey + 1);
            }
        } catch (error) {
            console.log("error creating stimuli: ", error);
        }
    }

    const cardOnClick = (stimuliId) => {
        navigate(`/stimuli/${stimuliId}`);
    }

    useEffect(() =>  {
        const getStim = async () => {
            try {
                const stim = await getAllStimuli();
                setStimuli(stim);
            } catch (error) {
                console.log("Error fetching stimuli: ", error);
            }
        }
        getStim();
    }, [refreshKey])

    return (
        <div>
            <div>
                <Button onClick={handleShow} variant="primary">
                    <PlusCircle />
                </Button>
            </div>
            <div>
                {stimuli.map(stim => (
                    <StimuliCard key={stim.id} title={stim.name} onClick={() => cardOnClick(stim.id)} />
                ))}
            </div>
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Create Stimuli: </Modal.Title>
                    </Modal.Header>
                    <Container>
                        <Row>
                        <Col>
                            <ListGroup className="list-group-flush">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>Stimuli Title:</InputGroup.Text>
                                        <Form.Control
                                        type='text'
                                        onChange={handleSettingTitle}
                                                    />
                                </InputGroup>
                            </ListGroup>
                        </Col>       
                        </Row>
                    </Container>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <form onSubmit={(event) => handleCreatingStimuli(event, createStimTitle)}>
                        <Button  variant="primary" type="submit">
                            Create Stimuli
                        </Button>
                    </form>
                    
                    </Modal.Footer>
                </Modal> 
            </div>
        </div>
    )
}

export default StimuliPage;