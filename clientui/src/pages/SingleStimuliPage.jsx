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
import DisplayUsersClientsSets from "../components/Accordion/ClientSets";
import { groupStimuli, getItems } from "../API/Item";

const OneStimPage = () => {
    const navigate = useNavigate();
    const [stim, setStim] = useState();
    const stimId = useParams();
    const [show, setShow] = useState(false);
    const [stimTitle, setTitle] = useState('');
    const [refreshKey, setRefreshKey] = useState(0);
    const [file, setFile] = useState(null);

    const [items, setItems] = useState([]);
    const [itemChoice, setItemChoice] = useState(null);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);    
    
    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    };

    const handleUpdate = async (event, id) => {
        event.preventDefault();
        try {
            const response = await updateStimuli(id, {name: stimTitle, itemId: itemChoice}, file)
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

    const handleItemSelection = (event) => {
        setItemChoice(event.target.value);
    }

    useEffect(() => {
        const getOneStim = async () => {
            try {
                const stimuli = await getAStimuli(stimId.id);
                setStim(stimuli)
                setTitle(stimuli.stimName)
                const allItems = await getItems();
                setItems(allItems);

            } catch (error) {
                console.log("Error fetching stimuli: ", error);
            }
        }
        getOneStim();
    }, [stimId, refreshKey]);

    return (
        <Container className="mt-5">
            <Row>
                <Col className="d-flex justify-content-center">
                    <Card className="border-3 border-black" style={{ width: '30rem' }}>
                        <Row >
                            <Col className="d-flex justify-content-start ">
                                <Button className="btns" onClick={handleShow}>
                                    <PencilFill />
                                </Button>
                            </Col>
                            <Col className="d-flex justify-content-end">
                                <Button className="rmvBtn" onClick={() => handleDelete(stimId.id)}>
                                    <Trash />
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-center mb-1 ">
                                {stim && <StimuliCard img={stim.image} title={stim.stimName} id={stim.id}  />}
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col xs={6}>
                                Stimuli Cateogry: 
                            </Col>
                            <Col xs={6}>
                                {stim && <p>{stim.item.category}</p>}
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mb-2" xs={12}>
                                <DisplayUsersClientsSets stimuliId={stimId.id} />
                            </Col>
                            <Col xs={12}>
                                <DisplayStimSetList actionType={'addStimuli'} id={stimId.id} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{stimTitle}</Modal.Title>
                </Modal.Header>
                <Container>
                    <Row>
                    <Col>
                        <ListGroup className="list-group-flush">
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Stimuli Title: </InputGroup.Text>
                                    <Form.Control
                                    type='text'
                                    defaultValue={stimTitle}
                                    onChange={handleTitleChange}
                                />
                            </InputGroup>
                        </ListGroup>
                    </Col>       
                    </Row>
                    <Row>
                        <Col>
                        <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Upload Image</Form.Label>
                                <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4}>
                            <InputGroup.Text>Assign Category: </InputGroup.Text>
                        </Col>
                        <Col>
                            <Form.Select aria-label="Default select example" onChange={handleItemSelection}>
                                    <option value={null}>Select</option>
                                    <option value={null}>None</option>
                                    {items.map(item => (
                                        <option key={item.id} value={item.id}>{item.category}</option>
                                ))}
                            </Form.Select> 
                        </Col>
                    </Row>
                </Container>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <form onSubmit={(event) => handleUpdate(event, stimId.id)}>
                    <Button className="btns" type="submit">
                        Save Changes
                    </Button>
                </form>
                
                </Modal.Footer>
            </Modal>
                </Col>
            </Row>
        </Container>
        
    
    )
}

export default OneStimPage;