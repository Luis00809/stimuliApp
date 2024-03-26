import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { getClients } from '../../API/ClientApi';
import EditClient from '../Forms/EditClients';

const DisplayClients = () => {
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
    }, [refreshKey])

    return(
        <Accordion>
        <Accordion.Item eventKey="0">
            <Accordion.Header>Clients</Accordion.Header>
            <Accordion.Body>
                <Container>
                    <Row>
                        {clients.map(client => (
                            <Col xs={12} key={client.id}>
                               <p>{client.name}</p>
                                <EditClient id={client.id} name={client.name} onRefresh={refreshData} />
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