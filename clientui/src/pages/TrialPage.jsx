import StimuliCard from "../components/Cards/StimuliCard";
import { useParams, useLocation } from "react-router-dom";
import { getStimSetsStimuli } from "../API/StimSetApi";
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ResultTable from "../components/ResultsTable";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'; 
import { createRound, addRoundToTrial } from "../API/RoundApi";
import { createTrial, addTrialToClient } from "../API/TrialApi";


const TrialPage = () => {
    
    const setId = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const maxTrialsFromURL = queryParams.get("maxTrials");
    const numberOfCardsFromURL = queryParams.get("numberOfCards");


    const [stimuli, setStimuli] = useState([]);
    const [currentStimuli, setCurrentStimuli] = useState([]);
    const [targetStimuli, setTargetStimuli] = useState(null);
    const [trialCount, setTrialCount] = useState(0);
    const [trialComplete, setTrialComplete] = useState(false);    

    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0);

    const [trialResults, setTrialResults] = useState([]);



    useEffect(() => {
        const fetchStimuli = async () => {
            try {
                if (setId) {
                    const stimSetStim = await getStimSetsStimuli(setId.id);
                    setStimuli(stimSetStim); 
                    startTrial(stimSetStim, numberOfCardsFromURL);
                } else {
                    console.log("error getting stim sets stimuli");
                }
            } catch (error) {
                console.log("error getting stim sets stimuli: ", error);
            }
        };

        fetchStimuli();
    }, [setId, numberOfCardsFromURL]);

    function getRandomStimuli(stimuli, numberOfStimuli) {
        const shuffled = stimuli.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, numberOfStimuli);
    }

    const startTrial = (allStimuli, numberOfStimuli) => {
        const selectedStimuli = getRandomStimuli(allStimuli, numberOfStimuli);
        setCurrentStimuli(selectedStimuli);
        setTargetStimuli(selectedStimuli[Math.floor(Math.random() * selectedStimuli.length)]);
        setTrialCount(trialCount + 1); 
    };

    const cancelTrial = () => {
        const trialCancel = confirm("Are you sure you want to end the trial?")
        if (trialCancel) {
            navigate("/");
        }
    }

    const handleStimuliSelection = (selectedStimuli) => {
        const trialResult = {
            target: targetStimuli.stimName,
            correct: selectedStimuli.id === targetStimuli.id
        };
        setTrialResults([...trialResults, trialResult]);
    
        if (selectedStimuli.id === targetStimuli.id) {
            setCorrect(correct + 1);
        } else {
            setIncorrect(incorrect + 1);
        }
    
        if (trialCount >= maxTrialsFromURL) {
            setTrialComplete(true); // Set trialComplete to true when maxTrials is reached
        } else {
            startTrial(stimuli, numberOfCardsFromURL); // Start next trial if not complete
        }
    };

    const saveTrial = async () => {
        const roundData = trialResults.map((result, index) => ({
            RoundNumber: index + 1,
            Target: result.target,
            Answer: result.correct ? "Correct" : "Incorrect"
        }));

        try {
            const createdRounds = await Promise.all(roundData.map(data => createRound(data)));
            const newTrial = {
                TotalCorrect: correct,
                TotalTrials: parseInt(maxTrialsFromURL, 10), 
                CardsOnScreen: parseInt(numberOfCardsFromURL, 10), 
                Rounds: roundData
            };
    

            await createTrial(newTrial);
            navigate("/");
            
        } catch (error) {
            console.log("Error saving trial: ", error);
        }
    }

    const discardTrial = () => {
        const discard = confirm("Are you sure you want to delete this data set?");
        if (discard) {
            navigate('/')
        }
    }

    return (
        <div>
            
            {trialComplete ? (
                <Container>
                    <Row className="mb-4 mt-4">
                        <Col className="text-center">
                            <h1>Trial Complete!</h1>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col>
                            <ResultTable trials={trialResults} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center">
                            <Button className="btns" onClick={saveTrial}>Save Trial</Button>
                            <Button className="btns" onClick={discardTrial}>Discard Trial</Button>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <>
                    <Container>
                        <Row>
                            <Col>
                                <Button className="btn btn-danger" onClick={cancelTrial}>Cancel Trial</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {targetStimuli && (
                                    <h2 className="text-center mt-5 mb-5">Target: {targetStimuli.stimName}</h2>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            {currentStimuli.map(stim => (
                                <Col key={stim.id} xs={6} md={4} >
                                    <StimuliCard img={stim.image} key={stim.id}  stimuli={stim} onClick={() => handleStimuliSelection(stim)} /> 
                                </Col>
                            ))}
                        </Row>
                    </Container>
                    
                    
                </>
            )}
        </div>
    );
}

export default TrialPage;
