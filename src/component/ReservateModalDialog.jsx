import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useState} from "react";

const ReservateModalDialog = (args) => {

    const [note, setNote] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchData()
            .then((responseStatus) => {
                args.onHide();
                args.getresponsestatus(responseStatus);
            })
            .catch((error) => {
                console.error('Request failed:', error);
            });
    };

    //send POST method to backend
    const fetchData = () => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        const author_id = localStorage.getItem('userId');
        const modifUser = localStorage.getItem('userFirstName');
        const createDate = new Date();
        const modifDate = new Date();
        const state = "REQUESTED";
        const fromDate = args.resinfo.startDate;
        const toDate = args.resinfo.endDate;
        const roomIds = [...args.resinfo.roomIds];

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({author_id, createDate, fromDate, modifDate, modifUser, note, roomIds, state, toDate}),
        };

        return fetch(`${backendUrl}/reservation/`, requestOptions)
            .then((response) => {
                const responseStatus = response.status;
                    return responseStatus;
            })
            .catch((error) => {
                // Handle the error
                console.error('Request failed:', error);
            });
    }

    return(
        <Modal
            {...args}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onExit = {() => {setNote('');}}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Shrnutí rezervace
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>od</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder= {args.resinfo.startDate}
                            readOnly
                            style={{ pointerEvents: 'none' }}
                        />
                        <Form.Label>do</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder= {args.resinfo.endDate}
                            readOnly
                            style={{ pointerEvents: 'none' }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Pokoje:</Form.Label>
                        <Form.Control type="text" placeholder= {args.resinfo.rooms} readOnly style={{ pointerEvents: 'none' }}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Poznámka:</Form.Label>
                        <Form.Control as="textarea" rows={3} value={note} onChange={(e) => {setNote(e.target.value);}}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={handleSubmit}>
                    Odeslat rezervaci
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ReservateModalDialog;