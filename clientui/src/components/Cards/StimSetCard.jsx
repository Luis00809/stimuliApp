import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { ArrowRight, PencilFill, Trash } from 'react-bootstrap-icons';
import { useState} from 'react';
import TrialModal from '../Modals/TrialModal';
import { deleteStimSet } from '../../API/StimSetApi';
import { removeSetFromClient } from '../../API/ClientApi';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; 
import EditStimSet from '../Modals/EditStimSet';

export default function StimSetCard({
    title,
    stimuli,
    id,
    onRefresh,
    setOption,
    
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
               alert("Set deleted.")
               onRefresh();
               

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
            <Card className='mb-5 stimSetCard border border-3 border-dark rounded-4'>
                    <Container fluid>
                       <Row className='border-bottom border-3 border-dark'>
                            <Col xs={6}>
                                <h2>{title}</h2>
                            </Col>
                            {setOption === "client" ? (
                                <Col xs={4} className='d-flex align-items-end'>
                                    <Button onClick={() => handleRemoveSetFromClient(clientId.id, id)}>
                                        Remove
                                    </Button>
                                </Col>
                            ) : (
                                <Col xs={4} className='d-flex align-items-end'>
                                    <Button onClick={() => handleSetDelete(id)}>
                                        <Trash/>
                                    </Button>
                                </Col>
                            )}
                            
                            <Col xs={2} className='d-flex align-items-end'>
                                <Button onClick={handleEditModal} variant="primary">
                                    <PencilFill />
                                </Button>{' '}
                            </Col>
                       </Row>
                       <Row>
                        <Col className='border-bottom border-2 border-dark' xs={12}>
                            <h4 >Stimuli in set:</h4>
                        </Col>
                        <Col>
                            {stimuli.map(stimuliItem => (
                                <div key={stimuliItem.id}>{stimuliItem.name}</div>
                            ))}
                        </Col>
                        <Col xs={3} className='d-flex align-items-end justify-content-end'>
                                <Button onClick={handleModal} variant="primary">
                                    <ArrowRight size={30} />
                                </Button>{' '}
                                
                            </Col>
                       </Row>
                       <Row>
                        {modal && <TrialModal show={modal} setId={id} closeModal={closeModal}/>}
                       </Row>
                       <Row>
                       {editModal && <EditStimSet id={id} show={editModal} closeModal={() => setEditModal(false)} onRefresh={onRefresh} />}
                       </Row>
                    </Container>
            </Card>

        </div>
    )
}
