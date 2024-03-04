import { getStimSet } from "../API/StimSetApi";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import StimSetCard from "../components/Cards/StimSetCard";

const StimSetsPage = () => {

    const [stimSets, setStimSets] = useState([]);

    useEffect(() => {
        const getSets = async () => {
            try {
                const sets = await getStimSet();
                setStimSets(sets);
            } catch (error) {
                console.log("error getting stim sets: ", error);
            }
        }
        getSets();
    }, [])


    return (
        <div>
            {stimSets.map(set => (
                <StimSetCard key={set.id} title={set.title} stimuli={set.stimuli} />
            ))}
        </div>
    )
}

export default StimSetsPage;