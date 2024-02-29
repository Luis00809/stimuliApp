import Card from 'react-bootstrap/Card';
import { ArrowRight } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

export default function ClientCard({
    name,

}) {
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                    <Container fluid>
                       <Row>
                            <Col xs={9} >
                                <Card.Title>{name}</Card.Title>
                            </Col>
                            <Col xs={3} className='bg-primary '>
                                <Link to="/login">
                                    <Button variant="primary">
                                        <ArrowRight size={30} />
                                    </Button>{' '}
                                </Link>
                            </Col>
                       </Row>
                    </Container>
            </Card>
        </div>
    )
}