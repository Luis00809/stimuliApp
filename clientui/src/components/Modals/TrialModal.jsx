
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';

export default function TrialModal({setId, closeModal}){
    const [maxTrials, setMaxTrials] = useState(0);
    const [numberOfCards, setNumberOfCards] = useState(0);

    const handleMaxTrialsChange = (event) => {
        setMaxTrials(event.target.value);
    };

    const handleNumberOfCardsChange = (event) => {
        setNumberOfCards(event.target.value);
    };

    return (
        <div>
             <Card style={{ width: '18rem' }}>
                
                <ListGroup className="list-group-flush">
                    <InputGroup className="mb-3">
                        <InputGroup.Text >Trials:</InputGroup.Text>
                            <Form.Control
                            type='number'
                            value={maxTrials}
                            onChange={handleMaxTrialsChange}
                            />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text >Cards on screen:</InputGroup.Text>
                            <Form.Control
                            type='number'
                            value={numberOfCards}
                            onChange={handleNumberOfCardsChange}
                            />
                    </InputGroup>
                </ListGroup>
                <Card.Body>
                    <Link to={`/${setId}/trial?maxTrials=${maxTrials}&numberOfCards=${numberOfCards}`}>
                        <Button variant="primary">
                            Begin
                        </Button>{' '}
                    </Link>
                    <Button onClick={closeModal}>
                        Exit
                    </Button>
                </Card.Body>
            </Card>
        </div>
    )
}