import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';

export default function StimuliCard({
    title,
    id,
    onClick,
    img,
    altText
}){
    return (
        <Button className='stimuliCard' onClick={onClick}  >
            <Card >
                <Container>
                    <Row>
                        <Col>
                            {img && 
                                <Card.Img className='stimuliImg' src={img} alt={altText}>
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