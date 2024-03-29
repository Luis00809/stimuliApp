import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { editClient } from "../../API/ClientApi";
import { Collection, PencilSquare } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ArrowRight } from "react-bootstrap-icons";

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

    const toDataPage = (id) => {
        console.log(id);
        navigate(`/client/trials/${id}`);
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
                                <Col xs={6}>
                                    <Button variant="secondary" onClick={() => toDataPage(id)}>Edit Data <ArrowRight /></Button>
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