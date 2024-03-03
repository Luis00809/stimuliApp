import StimuliCard from "../components/Cards/StimuliCard";
import { useState, useEffect } from 'react';
import { getAllStimuli } from "../API/StimuliApit";
import { useNavigate } from 'react-router-dom'; 

const StimuliPage = () => {
    const [stimuli, setStimuli] = useState([]);
    const navigate = useNavigate();

    const cardOnClick = (stimuliId) => {
        navigate(`/stimuli/${stimuliId}`);
    }

    useEffect(() =>  {
        const getStim = async () => {
            try {
                const stim = await getAllStimuli();
                setStimuli(stim);
            } catch (error) {
                console.log("Error fetching stimuli: ", error);
            }
        }
        getStim();
    }, [])

    return (
        <div>
            {stimuli.map(stim => (
                <StimuliCard key={stim.id} title={stim.name} onClick={() => cardOnClick(stim.id)} />
            ))}
        </div>
    )
}

export default StimuliPage;