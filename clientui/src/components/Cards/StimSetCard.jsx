import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { ArrowRight, PencilFill, Trash } from 'react-bootstrap-icons';
import { useState} from 'react';
import TrialModal from '../Modals/TrialModal';
import EditStimSet from '../Modals/StimSetEditModal';
import { deleteStimSet } from '../../API/StimSetApi';
import { removeSetFromClient } from '../../API/ClientApi';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; 

export default function StimSetCard({
    title,
    stimuli,
    id,
    onRefresh
    
}) {
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const clientId = useParams();
    const navigate = useNavigate();
    const handleModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    }

    const handleEditModal = () => {
        setEditModal(true);
    }

    const handleEditCloeModal = () => {
        setEditModal(false);
    }


    const handleSetDelete = async(id) => {

        const confirmDelete = window.confirm("Are you sure you want to delete this StimSet?");
        if (confirmDelete) {
            try {
               const deleted = await deleteStimSet(id);
               alert("Set removed from Client.")
                navigate(`/${clientId.id}/client`)
               if (deleted) {
                alert("Set removed from Client.")
                navigate(`/${clientId.id}/client`)
            }

            } catch (error) {
                console.log("error deleting stimset: ", error);
            }
        } else {
            console.log("Deletion canceled by the user.");
        }
    }

    const handleRemoveSetFromClient = async (clientId, setId) => {
        const confirmDelete = window.confirm("Are you sure you want to remove this stimuli set from the client?");
        if (confirmDelete) {
            try {
                const request  = await removeSetFromClient(clientId, setId);

                if (request) {
                    alert("Set removed from Client.")
                    navigate(`/${clientId}/client`)
                }
            } catch (error) {
                console.log("error removing stim set from client: ", error);
            }
        } else {
            console.log("delete cancled");
        }
    }




    return (
        <div>
            <Card style={{ width: '25rem' }}>
                    <Container fluid>
                       <Row>
                            <Col xs={4}>
                                <Card.Title>{title}</Card.Title>
                            </Col>
                            <Col>
                                <Button onClick={() => handleRemoveSetFromClient(clientId.id, id)}>
                                    Remove
                                </Button>
                            </Col>
                            <Col>
                                <Button onClick={() => handleSetDelete(id)}>
                                    <Trash/>
                                </Button>
                            </Col>
                            <Col>
                                <Button onClick={handleEditModal} variant="primary">
                                    <PencilFill />
                                </Button>{' '}
                            </Col>
                            
                       </Row>
                       <Row>
                        <Col>
                            <h4>Stimuli in set:</h4>
                        {stimuli.map(stimuliItem => (
                                <div key={stimuliItem.id}>{stimuliItem.name}</div>
                            ))}
                        </Col>
                        <Col xs={3} className='bg-primary '>
                                <Button onClick={handleModal} variant="primary">
                                    <ArrowRight size={30} />
                                </Button>{' '}
                                
                            </Col>
                       </Row>
                       <Row>
                        {modal && <TrialModal setId={id} closeModal={closeModal}/>}
                       </Row>
                       <Row>
                        {editModal && <EditStimSet onRefresh={onRefresh} id={id} closeModal={handleEditCloeModal}/>}
                       </Row>
                    </Container>
            </Card>

        </div>
    )
}
