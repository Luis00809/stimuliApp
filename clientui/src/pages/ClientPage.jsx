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

const ClientPage = () => {
    const [sets, setSets] = useState([]);
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
                } else {
                    console.log("error getting clients stim sets");
                }
            } catch (error) {
                console.log("error getting client's stim sets: ", error);
            }
        };

        fetchStimSets();
    }, [clientId, refreshKey]);


    const openAddToSetModal = () => {
        
    }

    return (
        <div>
            <div>
                <p>Client: {clientName}</p>
            </div>
            <div>
                <Button onClick={openAddToSetModal}>
                    <PlusCircle/>
                </Button>
            </div>
            <div>
                {sets.map(set => (
                    <StimSetCard setOption={"client"} onRefresh={refreshData} id={set.id} title={set.title} key={set.id} stimuli={set.stimuli}/>
                ))}
            </div>
            <div>
                <DisplayStimSetList onRefresh={refreshData} actionType={'AddSetToClient'} id={clientId.id} />
            </div>
        </div>
    )
}

export default ClientPage;