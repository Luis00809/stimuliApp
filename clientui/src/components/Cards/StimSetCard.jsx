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


// will add an edit button 
// add a delete button


export default function StimSetCard({
    title,
    stimuli,
    id,
    
}) {
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

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
        console.log(id)

        const confirmDelete = window.confirm("Are you sure you want to delete this StimSet?");
        if (confirmDelete) {
            try {
               const deleted = await deleteStimSet(id);
                // Optionally, refresh the list or update the UI to reflect the deletion
                if (deleted) {
                    alert("StimSet deleted successfully!");
                }
            } catch (error) {
                console.log("error deleting stimset: ", error);
            }
        } else {
            // If the user cancels, simply close the confirmation dialog
            console.log("Deletion cancelled by the user.");
        }
    }


    return (
        <div>
            <Card style={{ width: '25rem' }}>
                    <Container fluid>
                       <Row>
                            <Col xs={8}>
                                <Card.Title>{title}</Card.Title>
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
                        {editModal && <EditStimSet id={id} closeModal={handleEditCloeModal}/>}
                       </Row>
                    </Container>
            </Card>

        </div>
    )
}
