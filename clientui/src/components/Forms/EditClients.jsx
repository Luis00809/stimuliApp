import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { editClient, deleteClient } from "../../API/ClientApi";
import { Collection, PencilSquare, Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const EditClient = ({name, id, onRefresh}) => {
    const [show, setShow] = useState(false);
    const [clientName, setName] = useState(name);
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const {target} = e;

        const inputType = target.name;
        const inputValue = target.value;

        if(inputType === 'name'){
            setName(inputValue);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const response = await editClient(id, {Name: clientName});
        if (response.error) {
            console.log("error updating user");
        } else {
            onRefresh();
            setErrMsg('');
            handleClose();
        }
        return response;
    }

    const handleDelete = async (clientId) => {
        try {
            const deleteC = confirm("Are you sure you want to delete this client?")
            if (deleteC) {
                await deleteClient(clientId)
                handleClose();
                onRefresh();
            }
        } catch (error) {
            console.log("error deleting client: ", error);
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className="btns" onClick={handleShow}>
                <PencilSquare />
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Client</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" name="name" defaultValue={name} onChange={handleInputChange} />
                        </Form.Group>
                        <p>{errMsg}</p>
                        <Container >
                            <Row>
                                <Col xs={6}>
                                    <Button className="btns" type="submit">
                                        Save
                                    </Button>
                                </Col>
                                <Col>
                                    <Button onClick={() => handleDelete(id)} className="rmvBtn">
                                        Delete Client
                                    </Button>
                                </Col>
                                
                            </Row>
                        </Container>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditClient;