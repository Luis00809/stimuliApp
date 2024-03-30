import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { createClient } from "../../API/ClientApi";

const CreateClient = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [errMsg, setErrMsg] = useState('');


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const handleInputChange = (e) => {
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;

        if (inputType === 'name') {
            setName(inputValue);
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const createdClient = await createClient({Name: name})
            if (!createdClient) {
                console.log("error creting a cleint");
            } else {
                setShow(false);
                setErrMsg('');
            }
            
        } catch (error) {
            console.log("error creating a Client: ", error);
            setErrMsg('failed to create a Client.');

        }
    }

    return (
    <>
        <Button className="addBtns" onClick={handleShow}>
          Create Client
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create a Client</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" name="name" value={name} onChange={handleInputChange}/>
                    </Form.Group>
                    <Button className="btns" type="submit">
                        Submit
                    </Button>
                </Form>
                <p>{errMsg}</p> 
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  )
};

export default CreateClient;