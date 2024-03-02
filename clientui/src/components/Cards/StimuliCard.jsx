import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default function StimuliCard({
    title,
    id,
    onClick
}){
    return (
        <Button onClick={onClick}>
            <Card style={{ width: '18rem' }} >
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                </Card.Body>
            </Card>
        </Button>
    )
}