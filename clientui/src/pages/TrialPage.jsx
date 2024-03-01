import StimuliCard from "../components/Cards/StimuliCard";
import { useParams } from "react-router-dom";
import { getStimSetsStimuli } from "../API/StimSetApi";
import { useState, useEffect } from 'react';

const TrialPage = () => {
    const setId = useParams();
    const [stimuli, setStimuli] = useState([]);
    const [currentStimuli, setCurrentStimuli] = useState([]);
    const [targetStimuli, setTargetStimuli] = useState(null);
    const [trialCount, setTrialCount] = useState(0);
    const [trialComplete, setTrialComplete] = useState(false);
    
    const maxTrials = 10; // Hardcoded max trials
    const numberOfCards = 4;

    useEffect(() => {
        const fetchStimuli = async () => {
            try {
                if (setId) {
                    const stimSetStim = await getStimSetsStimuli(setId.id);
                    setStimuli(stimSetStim); 
                    startTrial(stimSetStim, numberOfCards);
                } else {
                    console.log("error getting stim sets stimuli");
                }
            } catch (error) {
                console.log("error getting stim sets stimuli: ", error);
            }
        };

        fetchStimuli();
    }, [setId]);

    function getRandomStimuli(stimuli, numberOfStimuli) {
        const shuffled = stimuli.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, numberOfStimuli);
    }

    const startTrial = (allStimuli, numberOfStimuli) => {
        const selectedStimuli = getRandomStimuli(allStimuli, numberOfStimuli);
        setCurrentStimuli(selectedStimuli);
        setTargetStimuli(selectedStimuli[Math.floor(Math.random() * selectedStimuli.length)]);
        setTrialCount(trialCount + 1); // Increment trial count
    };

    const handleStimuliSelection = (selectedStimuli) => {
        if (selectedStimuli.id === targetStimuli.id) {
            console.log("correct");
            if (trialCount >= maxTrials - 1) {
                setTrialComplete(true); // Set trialComplete to true when maxTrials is reached
            } else {
                startTrial(stimuli, numberOfCards); // Start next trial if not complete
            }
        } else {
            console.log("Wrong!");
        }
    };

    return (
        <div>
            {trialComplete ? (
                <h2>Trial Complete!</h2>
            ) : (
                <>
                    {targetStimuli && (
                        <h2 style={{textAlign: 'center', marginBottom: '20px'}}>Target: {targetStimuli.name}</h2>
                    )}
                    {currentStimuli.map(stim => (
                        <StimuliCard key={stim.id} title={stim.name} stimuli={stim} onClick={() => handleStimuliSelection(stim)} />
                    ))}
                </>
            )}
        </div>
    );
}

export default TrialPage;
