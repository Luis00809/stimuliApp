import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { getUsers } from '../../API/UserApi';
import { useEffect, useState } from 'react';
import EditUser from '../Forms/EditUser';

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
                                   <p>{user.firstName} {user.lastName} {user.email} </p>
                                   <h4>Clients:</h4>
                                    <ul>
                                        {user.clients.map(client => (
                                            <li key={client.id}>{client.name} </li>
                                        ))}
                                    </ul>                                 
                                    <EditUser onRefresh={refreshData} id={user.id} firstName={user.firstName} lastName={user.lastName} email={user.email} password={user.password} />
                                    
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