import Col from "react-bootstrap/esm/Col"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Button from "react-bootstrap/esm/Button"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getItems } from "../../API/Item"
import Modal from 'react-bootstrap/Modal';
import { ArrowRight } from 'react-bootstrap-icons';


const FilterStimuliModal = () => {

    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  

    useEffect(() => { 
        const fetchItems = async () => {
            try {
                const getsItems = await getItems();
                setItems(getsItems);
            } catch (error) {
                console.log("error fetching items: ", error);
            }
        }
        fetchItems()
    }, [])

    return (
        <Container>
           <Button variant="success" onClick={handleShow}>
                Filter by Category
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title className="text-center  w-100">Categories</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {items.map((item) => (
                        <Row key={item.id} className="m-3 border-2 border-bottom ">
                            <Col  xs={7}>{item.category}</Col>
                            <Col xs={4}>
                                <Button className="btns" onClick={() => navigate(`/${item.id}/filteredStimuli`)}>
                                  Go {""} <ArrowRight />
                                </Button>
                            </Col>
                        </Row>
                    ))} 
                 
                        
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default FilterStimuliModal;