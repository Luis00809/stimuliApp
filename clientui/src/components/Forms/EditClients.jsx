import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { editClient } from "../../API/ClientApi";

const EditClient = ({name, id}) => {
    const [show, setShow] = useState(false);
    const [clientName, setName] = useState(name);
    const [errMsg, setErrMsg] = useState('');

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
            setErrMsg('');
            handleClose();
        }
        return response;
    }


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Edit Client
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
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
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