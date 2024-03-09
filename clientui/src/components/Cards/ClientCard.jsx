import Card from 'react-bootstrap/Card';
import { ArrowRight } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function ClientCard({
    name,
    clientId
}) {
    return (
        <div>
            <Card className='mb-2 border border-3 border-primary ' style={{ width: '18rem' }}>
                    <Container fluid>
                       <Row>
                            <Col xs={9} className='d-flex align-items-center' >
                                <Card.Title>{name}</Card.Title>
                            </Col>
                            <Col xs={3} className='bg-primary '>
                                <Link to={`/${clientId}/client`}>
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