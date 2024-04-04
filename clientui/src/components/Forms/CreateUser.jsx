import { useState, useEffect } from "react";
import { createUser } from "../../API/UserApi";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';
import { validateEmail, checkPassword } from '../../utils/helpers';


const CreateUser = (props) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleInputChange = (e) => {
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;

        if (inputType === 'email') {
            setEmail(inputValue);
        } else if(inputType === 'password'){
            setPassword(inputValue);
        } else if (inputType === 'firstName'){
            setFirstName(inputValue);
        } else if (inputType === "lastName") {
            setLastName(inputValue)
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setErrMsg('invalid email');
            return;
        }

        if(!checkPassword(password)){
            setErrMsg('invalid password')
            return;
        }

        try {

            const newUser = await createUser({FirstName: firstName, LastName: lastName, Email: email, Password: password})
            props.onUserCreated();
            if(!newUser){
               console.log("error creating a user");
            } else {
                setShow(false)
            }
        } catch (error) {
            setErrMsg('failed to create a user. Please check your email and password.');
            console.error('creation failed:', error);

        }

    }

    return (
        <>
        <Button className="btns" onClick={handleShow}>
          Create User
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>First Name:</Form.Label>
                <Form.Control type='text' name="firstName" value={firstName} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Last Name:</Form.Label>
                <Form.Control type='text' name="lastName" value={lastName} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control type='email' name="email" value={email} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control type='password' name="password" value={password} onChange={handleInputChange} />
              </Form.Group>

              <Button className="btns" type="submit">
                Submit
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


export default CreateUser;  