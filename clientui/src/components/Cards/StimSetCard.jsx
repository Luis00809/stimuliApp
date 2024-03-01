import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { ArrowRight } from 'react-bootstrap-icons';

import { Link } from 'react-router-dom';

export default function StimSetCard({
    title,
    stimuli,
    id
}) {
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                    <Container fluid>
                       <Row>
                            <Col xs={9}>
                                <Card.Title>{title}</Card.Title>
                            </Col>
                            <Col xs={3} className='bg-primary '>
                                <Link to={`/${id}/trial`}>
                                    <Button variant="primary">
                                        <ArrowRight size={30} />
                                    </Button>{' '}
                                </Link>
                            </Col>
                       </Row>
                       <Row>
                        <h4>Stimuli in set:</h4>
                       {stimuli.map(stimuliItem => (
                            <div key={stimuliItem.id}>{stimuliItem.name}</div>
                        ))}
                       </Row>
                    </Container>
            </Card>
        </div>
    )
}
