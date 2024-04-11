
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getItemById } from "../API/Item";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import StimuliCard from "../components/Cards/StimuliCard";
import { useNavigate } from 'react-router-dom';

const FilteredStimuli = () => {
    const navigate = useNavigate();
    const [item, setItems] = useState(null);
    const itemId = useParams();
    const stimId = parseInt(itemId.id, 10)
    console.log(stimId);

    const cardOnClick = (stimuliId) => {
        navigate(`/stimuli/${stimuliId}`);
    }

    useEffect(() => {
        const fetchStimSetsStimuli = async () => {
          const response = await getItemById(stimId);   
          setItems(response);
        }
        fetchStimSetsStimuli();
    },[stimId])
    return (
        <>
        {item && (
            <Container>
                <Row>
                    <h2>{item.category} Stimuli:</h2> 
                </Row>
                <Row>
                    {item.stimuli.map(stim => ( 
                        <Col key={stim.id}>
                            <StimuliCard title={stim.stimName} img={stim.image} onClick={() => cardOnClick(stim.id)} />
                        </Col>
                    ))}
                </Row>
            </Container>
        )}
    </>
  ) 
}

export default FilteredStimuli;
