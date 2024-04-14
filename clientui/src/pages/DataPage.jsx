import { getClient, getClientsStimSets } from "../API/ClientApi";
import TrialTable from "../components/TrialTable";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Accordion from 'react-bootstrap/Accordion';

import GraphTrials from "../components/ResultsGraph/GraphTrial";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DataPage = () => {
    const [trials, setTrials] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);
    const [viewData, setViewData] = useState(false);
    const [clientSets, setClientSets] = useState([]);

    const [startDate, setStartDate] = useState(new Date());
    const [end, setEnd] = useState(null);

    const [selectedSetId, setSelectedSetId] = useState(null);
    const intSelctedSetId = parseInt(selectedSetId);
    console.log(intSelctedSetId);

    const formatDate = (date) => {
        if (!date) {
            return null; 
         }

        const year = date.getFullYear();
        const month = `0${date.getMonth() + 1}`.slice(-2); 
        const day = `0${date.getDate()}`.slice(-2);
        return `${year}-${month}-${day}`;
    }

    const formattedStartDate = formatDate(startDate);   
    const formattedEndDate = formatDate(end);


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
                    const setsOfClient = await getClientsStimSets(clientId.id);
                    setClientSets(setsOfClient);
                } else {
                    console.log("error getting client information.");
                }
                
            } catch (error) {
                console.log("error getting clients data");
            }
        }
        fetchClient();
    }, [clientId])
    
    return (
        <Container>
            <Row className="my-4 border-bottom border-3 text-center">
                <Col>
                    <h1>Client's Trials </h1>
                </Col>
            </Row>
            <Row>
                <Accordion>
                    <Accordion.Item eventKey="0">
                    <Accordion.Header>Graph</Accordion.Header>
                    <Accordion.Body>
                     <Card>
                        <Card.Header>See Graph Data:</Card.Header>
                        <Card.Body>
                            <Container>
                                <Row>
                                    <Col xs={5}> 
                                        <p>Select from client's stimuli sets: </p>
                                    </Col>
                                    <Col>
                                        <Form.Select aria-label="Select a Set" onChange={(e) => setSelectedSetId(e.target.value)}>
                                            <option value={null}>Select</option>
                                            { clientSets.map(set => (
                                                <option key={set.id} value={set.id}>{set.title}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Start Date: </p>
                                    </Col>
                                    <Col>
                                        <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={end}
                                        dateFormat='MM/dd/yyyy'
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Select end date: </p>
                                    </Col>
                                    <Col>
                                        <DatePicker
                                        selected={end}
                                        onChange={(date) => setEnd(date)}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={end}
                                        minDate={startDate}
                                        dateFormat='MM/dd/yyyy'

                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <Button variant="primary" onClick={() => setViewData(true)}>View Graph</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Body>
                                </Card>
                    </Accordion.Body>
                </Accordion.Item>
                
                </Accordion>
            </Row>
            <Row> 
                { viewData && 
                    <Container>
                        <Row> 
                            <Col>
                                <GraphTrials 
                                startDate={formattedStartDate} 
                                endDate={formattedEndDate} 
                                clientId={clientId.id} 
                                setId={intSelctedSetId}  />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button className="addBtns" onClick={() => setViewData(false)}>Close Graph</Button>
                            </Col>
                        </Row>
                    </Container>
                }
            </Row>
            <Row className="mt-4">
                {trials.map(trial => (
                        <Col xs={6} className="m-1" key={trial.id}>
                            <TrialTable trial={trial}  /> 
                        </Col>
                ))}
            </Row>
            
           
            {/* <Row>
                <Col>
                    <GraphTrials startDate={'2024-04-12'} endDate={'2024-04-14'} clientId={1005} setId={4042} />
                </Col>
            </Row> */}
        </Container>
    )
}

export default DataPage;