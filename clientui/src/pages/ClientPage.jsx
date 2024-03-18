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
import TrialTable from "../components/TrialTable";

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
        <Container>
            <Row>
                <Col className="text-center m-5">
                    <h1>{clientName}</h1>
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
            <Row>
                    <Col xs={12}>
                        <h2>Client's trials: </h2>
                    </Col>
                    {trials.map(trial => (
                        <Col xs={6} className="m-1" key={trial.id}>
                            <TrialTable trial={trial}  /> 
                        </Col>
                    ))}
                    
                
            </Row>            
        </Container>
               
    )
}

export default ClientPage;