import { useParams } from "react-router-dom";
import { getClientsStimSets } from "../API/ClientApi";
import { useState, useEffect } from 'react';
import StimSetCard from "../components/Cards/StimSetCard";

const ClientPage = () => {
    const [sets, setSets] = useState([]);
    const clientId  = useParams();

    useEffect(() => {
        const fetchStimSets = async () => {
            try {
                if (clientId) {
                    const clientSets = await getClientsStimSets(clientId.id);
                    setSets(clientSets); 
                } else {
                    console.log("error getting clients stim sets");
                }
            } catch (error) {
                console.log("error getting client's stim sets: ", error);
            }
        };

        fetchStimSets();
    }, [clientId]);

    const handleModal = () => {
        setModal(true); 
    }
    
    // need to put modal on the card itself as it will need the separate stimset id 

    return (
        <div>
           {sets.map(set => (
            <StimSetCard id={set.id} title={set.title} key={set.id} stimuli={set.stimuli}/>
           ))}
        </div>
    )
}

export default ClientPage;