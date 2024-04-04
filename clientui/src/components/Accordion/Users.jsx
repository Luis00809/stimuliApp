import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getUsers, deleteUser } from '../../API/UserApi';
import { useEffect, useState } from 'react';
import EditUser from '../Forms/EditUser';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Trash } from 'react-bootstrap-icons';

const DisplayUsers = (props) => {

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
    }, [props.refreshKey, refreshKey])


    const handleDelete = async (id) => {
        try {
            const toDelete = confirm("Are you sure you want to delete this user?");
            if (toDelete) {
                await deleteUser(id);
                refreshData();
            } 
        } catch (error) {
            console.log("error deleting user");
        }
    }

    return (
        <Accordion >
            <Accordion.Item eventKey="0">
                <Accordion.Header>Users</Accordion.Header>
                <Accordion.Body>
                    <Container>
                        <Row>
                            {users.map(user => (
                                <Col xs={12} key={user.id}>
                                    <Card className='m-2' >
                                        <Card.Body>
                                            <Container>
                                                <Row>
                                                    <Col xs={8} sm={9}>
                                                        <Card.Title>{user.firstName} {user.lastName}</Card.Title>
                                                    </Col>
                                                    <Col  xs={4} sm={2}>
                                                        <Button className='rmvBtn' onClick={() => handleDelete(user.id)}>
                                                            <Trash/>
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                <Row >
                                                    <Col >
                                                        <Card.Text> Email: {user.email}</Card.Text>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Card.Text> Clients: </Card.Text>
                                                    </Col>

                                                </Row>
                                                <Row>
                                                    <Col>
                                                    <ListGroup variant='flush'>
                                                        {user.clients.map(client => (
                                                            <ListGroup.Item key={client.id}>{client.name} </ListGroup.Item>
                                                        ))} 
                                                    </ListGroup>                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <EditUser onRefresh={refreshData} id={user.id} firstName={user.firstName} lastName={user.lastName} email={user.email} password={user.password} />
                                                    </Col>                                                    
                                                </Row>
                                            </Container>                                            
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