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
    return (
        <div>
           {sets.map(set => (
            <StimSetCard id={set.id} title={set.title} key={set.id} stimuli={set.stimuli} />
           ))}
        </div>
    )
}

export default ClientPage;