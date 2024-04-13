import { getClient } from "../API/ClientApi";
import TrialTable from "../components/TrialTable";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { getTrialsByDate } from "../API/TrialApi";

const DataPage = () => {
    const [trials, setTrials] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);
    const [trialData, setTrialData] = useState([]);
    const [viewData, setViewData] = useState(false);

    const refreshData = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };

    const clientId = useParams();

    useEffect(() => {
        const fetchClient = async () => {
            try {
                if(clientId) {
                    const client = await getClient(clientId.id)
                    setTrials(client.trials)
                } else {
                    console.log("error getting client information.");
                }
                
            } catch (error) {
                console.log("error getting clients data");
            }
        }
        fetchClient();
    }, [clientId])

    const trialsByDate = async (date, clientId, setId) => {
        try {
            const response = await getTrialsByDate(date, clientId, setId);
            setTrialData(response.data);
            
        } catch (error) {
            console.log("error getting trials: ", error);
        }
    }
    trialsByDate("2024-04-12", clientId.id, 4042)

    return (
        <Container>
            <Row className="my-4 border-bottom border-3 text-center">
                <Col>
                    <h1>Client's Trials </h1>
                </Col>
            </Row>
            <Row>
                {trials.map(trial => (
                        <Col xs={6} className="m-1" key={trial.id}>
                            <TrialTable trial={trial}  /> 
                        </Col>
                ))}
            </Row>
            <Row>
                <Col>
                    <Button variant="primary" onClick={() => setViewData(true)}>View Graph</Button>
                </Col>
                <Col>
                    {viewData ? trialData.map(data => (
                        <p key={data.id}>{data.id}</p>
                    ))  : <p>No Data</p>}
                </Col>
            </Row>
        </Container>
    )
}

export default DataPage;