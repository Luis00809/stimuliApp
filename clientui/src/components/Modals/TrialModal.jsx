import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';

export default function TrialModal({ show, closeModal, setId, clientId }) {
    const [maxTrials, setMaxTrials] = useState(0);
    const [numberOfCards, setNumberOfCards] = useState(0);

    const handleMaxTrialsChange = (event) => {
        setMaxTrials(event.target.value);
    };

    const handleNumberOfCardsChange = (event) => {
        setNumberOfCards(event.target.value);
    };

    return (
        <Modal show={show} onHide={closeModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Trial Configuration</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card style={{ width: '18rem' }}>
                    <ListGroup className="list-group-flush">
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Trials:</InputGroup.Text>
                            <Form.Control
                                type='number'
                                value={maxTrials}
                                onChange={handleMaxTrialsChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>Cards on screen:</InputGroup.Text>
                            <Form.Control
                                type='number'
                                value={numberOfCards}
                                onChange={handleNumberOfCardsChange}
                            />
                        </InputGroup>
                    </ListGroup>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Link to={`/${setId}/trial?maxTrials=${maxTrials}&numberOfCards=${numberOfCards}&client=${clientId}`}>
                    <Button className='btns'>Begin</Button>
                </Link>
                <Button variant="secondary" onClick={closeModal}>Exit</Button>
            </Modal.Footer>
        </Modal>
    );
}
