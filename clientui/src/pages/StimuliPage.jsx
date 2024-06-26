import StimuliCard from "../components/Cards/StimuliCard";
import { useState, useEffect } from 'react';
import { getAllStimuli } from "../API/StimuliApit";
import { useNavigate } from 'react-router-dom';
import { createStimuli } from "../API/StimuliApit";
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { getItems, groupStimuli } from "../API/Item";
import { CreateCategory } from "../components/Forms/CreateItem";
import FilterStimuliModal from "../components/Modals/FilterStimuli";

const StimuliPage = () => {
    const [stimuli, setStimuli] = useState([]);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [createStimTitle, setStimTitle] = useState('');
    const [file, setFile] = useState(null);
    const [items, setItems] = useState([]);
    const [itemChoice, setItemChoice] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSettingTitle = (event) => {
        setStimTitle(event.target.value)
    };

    const handleCreatingStimuli = async (event) => {
        event.preventDefault();
    
        try {
            const creatingStimuli = await createStimuli({name: createStimTitle, itemId: itemChoice  }, file)
            if(creatingStimuli) {
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

    const handleAddingItem = (event) => {
        setItemChoice(event.target.value);
    }

    useEffect(() =>  {
        const getStim = async () => {
            try {
                const stim = await getAllStimuli();
                setStimuli(stim);
                const item = await getItems();
                setItems(item);
            } catch (error) {
                console.log("Error fetching stimuli: ", error);
            }
        }
        getStim();
    }, [refreshKey])

    const handleItemCreated = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };

    return (
        <Container className="mt-3" >
            <Row className="my-4 border-bottom border-3 text-center">
                <Col xs={12} sm={4}>
                    <h1> All Stimuli</h1>
                </Col>
                <Col xs={5} sm={4}   >
                    <Button onClick={handleShow} className="btns rounded-2">
                        Create Stimuli
                        {/* <PlusCircle /> */}
                    </Button>
                </Col>
                <Col xs={5} sm={4} >
                    <CreateCategory onItemCreated={handleItemCreated} />
                </Col>
            </Row>
            <Row className="my-3">
                
                <Col xs={6}>
                    <FilterStimuliModal />
                </Col>
            </Row>
            <Row>
                    {stimuli.map(stim => (
                        <Col key={stim.id} xs={6} md={6} lg={6} xl={4} >
                            <StimuliCard key={stim.id} title={stim.stimName} img={stim.image} onClick={() => cardOnClick(stim.id)} />
                        </Col>
                    ))}
            </Row>
            
            <Row>
                <Col>
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
                        <Row>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Upload Image</Form.Label>
                                <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Select aria-label="Default select example" onChange={handleAddingItem}>
                                    <option>Assign to a Category</option>
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
                    <form onSubmit={(event) => handleCreatingStimuli(event, createStimTitle)}>
                        <Button className="btns" type="submit">
                            Create Stimuli
                        </Button>
                    </form>
                    
                    </Modal.Footer>
                </Modal> 
                </Col>
            </Row>
        </Container>
    )
}

export default StimuliPage;