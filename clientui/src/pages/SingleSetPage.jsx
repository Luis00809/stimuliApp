import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import StimSetCard from "../components/Cards/StimSetCard";
import { getOneStimSet } from "../API/StimSetApi";


const SingleSetPage = () => {
    const [oneSet, setSet] = useState();
    const setId = useParams();

    useEffect(() => {
        const fetchOneSet = async () => {
            try {
                const set = await getOneStimSet(setId.id);
                setSet(set);
            } catch (error) {
                console.log("error getting stimuil set: ", error);
            }
        };
        fetchOneSet();
    }, [setId]);


    return (
        <div>
            {oneSet && <StimSetCard title={oneSet.title} stimuli={oneSet.stimuli} id={oneSet.id} />}
        </div>
    )
}
export default SingleSetPage;