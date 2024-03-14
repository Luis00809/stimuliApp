import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function StimuliCard({
    title,
    id,
    onClick,
    img
}){
    return (
        <Button className='stimuliCard' onClick={onClick}  >
            <Card >
                <Container>
                    <Row>
                        <Col>
                            {img && 
                                <Card.Img className='stimuliImg' src={img} alt={title}>
                                </Card.Img>
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                         <Card.Title>{title}</Card.Title>
                        </Col>
                    </Row>
                </Container>
            </Card>   
        </Button>
    )
}