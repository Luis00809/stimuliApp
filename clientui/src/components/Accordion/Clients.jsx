import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { getClients } from '../../API/ClientApi';
import EditClient from '../Forms/EditClients';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const DisplayClients = (props) => {
    const [refreshKey, setRefreshKey] = useState(0);

    const [clients, setClients] = useState([]);

    const refreshData = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const fetchedClients = await getClients();
                setClients(fetchedClients);
            } catch (error) {
                console.log("error getting clients: ", error);
            }
        }
        fetchClients();
    }, [props.refreshKey, refreshKey])

    return(
        <Accordion>
        <Accordion.Item eventKey="0">
            <Accordion.Header>Clients</Accordion.Header>
            <Accordion.Body>
                <Container>
                    <Row>
                            {clients.map(client => (
                                 <Col key={client.id} xs={6}>
                                    <Card  className="mb-2" >
                                        <Card.Body className='d-flex justify-content-between'>
                                            <Card.Text>{client.name}</Card.Text>
                                            <EditClient id={client.id} name={client.name} onRefresh={refreshData} />

                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}                        
                    </Row>
                                                
                </Container>
            </Accordion.Body>
        </Accordion.Item>
       
    </Accordion>
    )
}

export default DisplayClients;