import { getStimSet } from "../API/StimSetApi";
import { useState, useEffect } from 'react';
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
import { getUsersClients } from "../API/UserApi";
import { addSetToClient } from "../API/ClientApi";
import auth from "../API/auth";


const StimSetsPage = () => {

    const [stimSets, setStimSets] = useState([]);
    const [setTitle, setSetTitile] = useState('');
    const [show, setShow] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [publicSet, setPublicSet] = useState(true);

    const handleClose = () => {
        setShow(false);
        setClientAdding([]); 
    };

    const handleShow = () => setShow(true);
    const [usersClients, setUsersClients] = useState([]);
    const [clientAdding, setClientAdding] = useState([]);


    const handleSettingTitle = (event) => {
        setSetTitile(event.target.value)
    };

    const handleCreatingStimSet = async (event, setTitle, publicSet) => {
        event.preventDefault();
        try {

            if (!publicSet) {
                if (clientAdding.length === 0) {
                    alert("Please select at least one client");
                    return;
                }
                const createSet = await createStimSet({title: setTitle, public: publicSet});
                
                // get the created stimulis id to add to each selected client
                for (const clientId of clientAdding) {
                    await addSetToClient(clientId, createSet.id);
                }

                handleClose();
                setPublicSet(false)
                setRefreshKey(prevKey => prevKey + 1);
            } else if(publicSet) {
                const creatingStimSet = await createStimSet({title: setTitle, public: publicSet});
                handleClose();
                setPublicSet(false)
                setRefreshKey(prevKey => prevKey + 1);
            }
            
        } catch (error) {
            console.log("error creating stimset: ", error);
        }
    }

    const handleAddingSetToClient = async (clientId, isChecked) => {
        if (isChecked) {
            setClientAdding(prev => [...prev, clientId]);
        } else {
            setClientAdding(prev => prev.filter(id => id !== clientId));
        }
    }

    const refreshData = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };

    useEffect(() => {
        const getSets = async () => {
            try {
                const sets = await getStimSet();
                setStimSets(sets);
                const userId = await auth.getUserId();

               if (userId) {
                   const clients = await getUsersClients(userId);
                   setUsersClients(clients)
                } else {
                    console.log("no user selected");
                }
               
            } catch (error) {
                console.log("error getting stim sets: ", error);
            }
        }
        getSets();
    }, [refreshKey])



    return (
        <Container>
            <Row xs={11} className="my-4 border-bottom border-3 text-center">
                <Col >
                    <h1>Stimuli Sets</h1>
                </Col>
                <Col xs={1} className=" d-flex justify-content-end"  style={{ paddingLeft: 0, paddingRight: 0, marginLeft: 0, marginRight: 2 }}>
                    <Button onClick={handleShow} className="btns ">
                        <PlusCircle />
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    {stimSets.map(set => (
                        <StimSetCard onRefresh={refreshData} key={set.id} id={set.id} title={set.title} stimuli={set.stimuli} />
                    ))}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Modal show={show} backdrop="static" onHide={handleClose}>
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
                                    <Form>
                                        <Form.Check // prettier-ignore
                                            type="switch"
                                            id="custom-switch"
                                            label="Public"
                                            checked={publicSet}
                                            onChange={(e) => setPublicSet(e.target.checked)}
                                        />
                                        
                                    </Form>
                                </ListGroup>
                            </Col>       
                            </Row>
                            {!publicSet && (
                                <Container>
                                     <Row>
                                        <Col className="mt-4">
                                            <p>If the stim set is private then you must need to assign it to a client</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        {usersClients.map(usersClient => (
                                                <Col key={usersClient.id} xs={12}>
                                                    <Form>
                                                        <Form.Check // prettier-ignore
                                                            type={"checkbox"}
                                                            id={usersClient.id}
                                                            label={usersClient.name}
                                                            onChange={(e) => handleAddingSetToClient(usersClient.id, e.target.checked)}
                                                        />   
                                                    </Form>
                                                </Col>
                                                
                                        ))}
                                    </Row>
                                </Container>
                            )}
                        </Container>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <form onSubmit={(event) => handleCreatingStimSet(event, setTitle, publicSet)}>
                            <Button className="btns" type="submit">
                                Create Stimuli Set
                            </Button>
                        </form>
                        
                        </Modal.Footer>
                    </Modal> 
                </Col>
            </Row>
                
        </Container>
    )
}

export default StimSetsPage;