import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getUsers } from '../../API/UserApi';
import { useEffect, useState } from 'react';
import EditUser from '../Forms/EditUser';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


const DisplayUsers = () => {

    const [users, setUsers] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);
    
    const refreshData = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };

    useEffect(() => {
        const getsUsers = async () => {
            try {

                const allUsers = await getUsers();
                setUsers(allUsers);

            } catch (error) {
                console.log("error getting users");
            }
        }
        getsUsers();
    }, [refreshKey])

    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Users</Accordion.Header>
                <Accordion.Body>
                    <Container>
                        <Row>
                            {users.map(user => (
                                <Col xs={12} key={user.id}>
                                    <Card className='m-2' >
                                        <Card.Body>
                                            <Card.Title>{user.firstName} {user.lastName}</Card.Title>
                                            <Card.Text> Email: {user.email}</Card.Text>
                                            <Card.Text> Clients: </Card.Text>
                                            <ListGroup variant='flush'>
                                                {user.clients.map(client => (
                                                    <ListGroup.Item key={client.id}>{client.name} </ListGroup.Item>
                                                ))} 
                                            </ListGroup>
                                            <EditUser onRefresh={refreshData} id={user.id} firstName={user.firstName} lastName={user.lastName} email={user.email} password={user.password} />
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
};

export default DisplayUsers;