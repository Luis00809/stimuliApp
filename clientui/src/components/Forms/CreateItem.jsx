import { createItem } from "../../API/Item"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from "react";
import Form from 'react-bootstrap/Form';

export const CreateCategory = ({ onItemCreated }) => {
    const [categoryName, setName] = useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const handleCreateItem = async (name) => {
        try {
            const createsItem= await createItem({category: name});
            if (createsItem) {
                console.log("item created: ");
                setShow(false);
                onItemCreated();
            } else {
                console.log("error creating item");
            }
        } catch (error) {
            console.log("error creating item: ", error);
        }
    }

    const handleName = (event) => {
     setName(event.target.value);   
    }
	return (
		<>
            <Button className="btns" onClick={handleShow}>
                Create Category
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Create Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Category Name:</InputGroup.Text>
                            <Form.Control
                            type='text'
                            onChange={handleName}
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleCreateItem(categoryName)}>
                    Create
                </Button>
                </Modal.Footer>
            </Modal>
        </>
	)
}