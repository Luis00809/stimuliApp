import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getAStimuli } from "../API/StimuliApit";
import StimuliCard from "../components/Cards/StimuliCard";

const OneStimPage = () => {
    const [stim, setStim] = useState();
    const stimId = useParams();
    console.log(stim);
    
    useEffect(() => {
        const getOneStim = async () => {
            try {
                const stimuli = await getAStimuli(stimId.id);
                setStim(stimuli)
            } catch (error) {
                console.log("Error fetching stimuli: ", error);
            }
        }
        getOneStim();
    }, [stimId]);

    return (
        <div>
            {stim && <StimuliCard title={stim.name} id={stim.id} onClick={() => console.log('works')} />}
        </div>
    )
}

export default OneStimPage;