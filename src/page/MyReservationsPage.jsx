import NavigationBarIn from "../component/NavigationBarIn.jsx";
import ListGroup from 'react-bootstrap/ListGroup';
import ReservationRow from "../component/ReservationRow.jsx";
import {useEffect, useRef, useState} from "react";
import Alert from "react-bootstrap/Alert";


const MyReservationsPage = () => {

    const [reservations, setReservations] = useState([]);
    const alertVariant = useRef('');
    const alertValue = useRef('');
    const responseStatus = useRef(0);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        fetchData(localStorage.getItem('userId'));
    },[]);

    const fetchData = async (userId) => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };

        await fetch(`${backendUrl}/reservation?userId=${userId}`)
            .then(async (response) => {
                    if (response.status === 200) {
                        setReservations((await response.json()));
                    } else if (response.status === 204){
                        setReservations([]);
                    }
                }
            )
    };

    const deleteRow = async (reservationId) =>{
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };

        await fetch(`${backendUrl}/reservation/${reservationId}`, requestOptions)
            .then(async (response) => {
                if (response.status === 204) {
                    const foundIndex = reservations.findIndex(item => item.id == reservationId);
                    if (foundIndex !== -1) {
                        const tempReservations = reservations.filter((item, index) => index !== foundIndex);
                        setReservations([...tempReservations]);
                    }
                } else {
                    throw new Error("Error with loading user");
                }
                responseStatus.current = response.status;
                setAlert();
            })
    };

    const setAlert  = () => {
        if (responseStatus.current == 204){
            alertVariant.current = 'success';
            alertValue.current = 'Rezervace byla úspěšně zrušena.';
        }else{
            alertVariant.current = 'danger';
            alertValue.current = 'Rezervaci se nepodařilo zrušit. (error code: ' + responseStatus.current + ')';
        }

        setShowAlert(true);

        // Hide the alert after 3 seconds
        const timeout = setTimeout(() => {
            alertValue.current = '';
            setShowAlert(false);
        }, 3000);

        // Clean up the timeout
        return () => {
            clearTimeout(timeout);
        };
    };

    return(
        <div>
            <NavigationBarIn/>
            <div style={{alignItems:"center",  display:"flex", flexDirection:"column"}}>
                {alertValue.current && (<Alert style={{width:"50%"}} variant={alertVariant.current} onClose={() => alertValue.current = ''} dismissible >{alertValue.current}</Alert>)}
                <ListGroup as="ol" numbered style={{width:"70%"}}>
                    {reservations.map((reservation) => (
                        <ReservationRow key={reservation.id} reservation={reservation} callCancel={deleteRow}/>
                    ))}
                </ListGroup>
            </div>
        </div>
    )
}

export default MyReservationsPage;