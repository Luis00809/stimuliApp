import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';
import { editUser } from "../../API/UserApi";
import { useNavigate } from "react-router-dom";



const EditUser = ({id, firstName, lastName, email, password }) => {

    const [show, setShow] = useState(false);
    const [first, setFirst] = useState(firstName);
    const [last, setLast] = useState(lastName);
    const [editEmail, setEmail] = useState(email);
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleInputChange = (e) => {
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;

        if (inputType === 'email') {
            setEmail(inputValue);
        } else if (inputType === 'firstName'){
            setFirst(inputValue);
        } else if (inputType === "lastName") {
            setLast(inputValue)
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const response = await editUser({FirstName: first, LastName: last, Email: editEmail, Password: password}, id);
        if (response.error) {
            console.log("error updating user");
        } else {
            setErrMsg('');
            handleClose();
            navigate(`/dashboard`)
        }
        
        
        return response; 
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Edit User
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address:</Form.Label>
                            <Form.Control type="email" name="email" defaultValue={email} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>First Name:</Form.Label>
                            <Form.Control type="text" name="firstName" defaultValue={firstName} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Last Name:</Form.Label>
                            <Form.Control type="text" name="lastName" defaultValue={lastName} onChange={handleInputChange} />
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
    );
}

export default EditUser;