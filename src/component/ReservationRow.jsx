import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";



const ReservationRow = (args) =>{

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${day}.${month}.${year}`;
        return formattedDate;
    };

    const cancelReservation = () =>{
        args.callCancel(args.reservation.id);
    };

    return(
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
            style={{backgroundColor:"lightgray"}}
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">Rezervace: {formatDate(args.reservation.fromDate)} - {formatDate(args.reservation.toDate)}</div>
                Pokoje: {args.reservation.rooms.map((room) => (
                <span key={room.id}>{room.name}&nbsp;</span>
                ))}
                <br/>
                Poznámka: {args.reservation.note}
            </div>
            <Button variant="danger" style={{width:"7%"}} onClick={cancelReservation}>Zrušit</Button>

        </ListGroup.Item>
    )
}

export default ReservationRow;