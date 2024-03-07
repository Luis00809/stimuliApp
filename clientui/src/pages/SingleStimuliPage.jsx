import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getAStimuli } from "../API/StimuliApit";
import StimuliCard from "../components/Cards/StimuliCard";
import { ArrowRight, PencilFill, Trash } from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { updateStimuli, deleteStimuli } from "../API/StimuliApit";
import { useNavigate } from 'react-router-dom'; 
import DisplayStimSetList from "../components/Accordion/StimSet";

// import editStimuliModal from "../components/Modals/StimuliEditModal";

const OneStimPage = () => {
    const navigate = useNavigate();
    const [stim, setStim] = useState();
    const stimId = useParams();
    const [show, setShow] = useState(false);
    const [stimTitle, setTitle] = useState('');
    const [refreshKey, setRefreshKey] = useState(0);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);    
    
    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    };

    const handleUpdate = async (event, id) => {
        event.preventDefault();
        try {
            const response = await updateStimuli(id, {name: stimTitle})
            if(response){
                handleClose();
                setRefreshKey(prevKey => prevKey + 1);
            }
        } catch (error) {
            console.log("error updating stimuli: ", error);
        }
    }

    const handleDelete = async (id) => {
        try {
           await deleteStimuli(id);
            navigate('/stimuli')
        } catch (error) {
            console.log("error deleting stimuli: ", error);
        }
    }

    

    useEffect(() => {
        const getOneStim = async () => {
            try {
                const stimuli = await getAStimuli(stimId.id);
                setStim(stimuli)
                setTitle(stimuli.name)
            } catch (error) {
                console.log("Error fetching stimuli: ", error);
            }
        }
        getOneStim();
    }, [stimId, refreshKey]);


    return (
        
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                {stim && <StimuliCard title={stim.name} id={stim.id} onClick={() => console.log('works')} />}
                </Card.Body>
                <Card.Body>
                    <Button onClick={handleShow}>
                        <PencilFill />
                    </Button>
                    <Button onClick={() => handleDelete(stimId.id)}>
                        <Trash />
                    </Button>
                    <DisplayStimSetList actionType={'addStimuli'} id={stimId.id} />
                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{stimTitle}</Modal.Title>
                </Modal.Header>
                <Container>
                    <Row>
                    <Col>
                        <ListGroup className="list-group-flush">
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Stimuli Title:</InputGroup.Text>
                                    <Form.Control
                                    type='text'
                                    value={stimTitle}
                                    onChange={handleTitleChange}
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
                <form onSubmit={(event) => handleUpdate(event, stimId.id)}>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </form>
                
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default OneStimPage;