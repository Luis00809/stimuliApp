import { useState, useEffect } from "react";
import CreateUser from "../components/Forms/CreateUser";
import CreateClient from "../components/Forms/CreateClient";
import DisplayUsers from "../components/Accordion/Users";
import DisplayClients from "../components/Accordion/Clients";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Dashboard = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <Container>
            <Row className="my-5">
                <Col>
                    <h2>Create:</h2>
                </Col>
                <Col>
                    <CreateUser onUserCreated={() => setRefreshKey(prevKey => prevKey + 1)} />
                </Col>
                <Col>
                    <CreateClient />
                </Col>
            </Row>
            <Row>
                <Col xs={3}>
                    <h2>Edit:</h2>
                </Col>
                <Col>
                    <DisplayUsers refreshKey={refreshKey} />
                </Col>
                <Col>
                    <DisplayClients />
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard;