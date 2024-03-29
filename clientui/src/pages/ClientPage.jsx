import { useParams } from "react-router-dom";
import { getClientsStimSets, getClient } from "../API/ClientApi";
import { useState, useEffect } from 'react';
import StimSetCard from "../components/Cards/StimSetCard";
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { PlusCircle } from 'react-bootstrap-icons';
import DisplayStimSetList from "../components/Accordion/StimSet";
import { Link } from 'react-router-dom';

import "../css/Clientpage.css"

const ClientPage = () => {
    const [sets, setSets] = useState([]);
    const [trials, setTrials] = useState([]);
    const clientId  = useParams();
    const [clientName, setClientName] = useState('')
    const [refreshKey, setRefreshKey] = useState(0);

    const refreshData = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };
    

    useEffect(() => {
        const fetchStimSets = async () => {
            try {
                if (clientId) {
                    const client = await getClient(clientId.id)
                    const clientSets = await getClientsStimSets(clientId.id);
                    setSets(clientSets); 
                    setClientName(client.name)
                    setTrials(client.trials)
                } else {
                    console.log("error getting clients stim sets and Trial data");
                }
            } catch (error) {
                console.log("error getting client's stim sets or trial data: ", error);
            }
        };

        fetchStimSets();
    }, [clientId, refreshKey]);

    return (
        <Container className="mt-3">
            <Row className="my-4 border-bottom border-3 text-center">
                <Col xs={6} md={6}>
                    <h1><span className="text-black">Client:</span> {clientName}</h1>
                </Col>
                <Col xs={5} md={4} className=" d-flex justify-content-end"  style={{ paddingLeft: 0, paddingRight: 0, marginLeft: 0, marginRight: 2 }}>
                    <Link to={`/client/trials/${clientId.id}`}>
                        <Button className='btns rounded-2'>
                            To Client's Data
                        </Button>{' '}
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <h2 className="mb-2">{clientName}'s Stimuli Sets:</h2>
                </Col>
                <Col lg={7}>
                    {sets.map(set => (
                        <StimSetCard setOption={"client"} onRefresh={refreshData} id={set.id} title={set.title} key={set.id} stimuli={set.stimuli}/>
                    ))}
                </Col>
                <Col lg={5}>
                    <DisplayStimSetList onRefresh={refreshData} actionType={'AddSetToClient'} id={clientId.id} />
                </Col>
                
            </Row>
                  
        </Container>
               
    )
}

export default ClientPage;