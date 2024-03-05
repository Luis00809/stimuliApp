import { getStimSet } from "../API/StimSetApi";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import StimSetCard from "../components/Cards/StimSetCard";
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { PlusCircle } from 'react-bootstrap-icons';
import { createStimSet } from "../API/StimSetApi";


const StimSetsPage = () => {

    const [stimSets, setStimSets] = useState([]);
    const [setTitle, setSetTitile] = useState('');
    const [show, setShow] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSettingTitle = (event) => {
        setSetTitile(event.target.value)
    };

    const handleCreatingStimSet = async (event, setTitle) => {
        event.preventDefault();
        try {
            const creatingStimSet = await createStimSet({title: setTitle});
            if (creatingStimSet) {
                handleClose();
                setRefreshKey(prevKey => prevKey + 1);
            }
        } catch (error) {
            console.log("error creating stimset: ", error);
        }
    }


    useEffect(() => {
        const getSets = async () => {
            try {
                const sets = await getStimSet();
                setStimSets(sets);
            } catch (error) {
                console.log("error getting stim sets: ", error);
            }
        }
        getSets();
    }, [refreshKey])


    return (
        <div>
            <div>
                <Button onClick={handleShow} variant="primary">
                    <PlusCircle />
                </Button>
            </div>
            <div>
                {stimSets.map(set => (
                    <StimSetCard key={set.id} id={set.id} title={set.title} stimuli={set.stimuli} />
                ))}
            </div>
            <div>
            <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Create Stimuli Set: </Modal.Title>
                    </Modal.Header>
                    <Container>
                        <Row>
                        <Col>
                            <ListGroup className="list-group-flush">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>Stimuli Set Title:</InputGroup.Text>
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
                    <form onSubmit={(event) => handleCreatingStimSet(event, setTitle)}>
                        <Button  variant="primary" type="submit">
                            Create Stimuli Set
                        </Button>
                    </form>
                    
                    </Modal.Footer>
                </Modal> 
            </div>
        </div>
    )
}

export default StimSetsPage;