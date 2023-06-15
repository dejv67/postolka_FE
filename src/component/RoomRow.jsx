import CustomTableField from "./CustomTableField.jsx";
import {useEffect, useState} from "react";

const RoomRow = (args) => {

    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetchData(args.room.id, args.days[0], args.days[args.days.length-1]);
    },[args.days]);

    // Calling backend for reservation each room
    const fetchData = async (id, fromDate, toDate) => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };

        await fetch(`${backendUrl}/room/roomReservations?roomId=${id}&fromDate=${fromDate.toISOString()}&toDate=${toDate.toISOString()}`)
                .then(async (response) => {
                if (response.status === 200) {
                    setReservations((await response.json()));
                } else if (response.status === 204){
                    setReservations([]);
                }
            }
        )
    };

    const getCustomTableField = (index) => {
        if (reservations != null && reservations.length > 0){
            const dateToCheck = new Date(formatDate(args.days[index]));
            let isAlreadyReserved = false;

            reservations.forEach((reservation) => {
                    const fromDate = new Date(reservation.fromDate);
                    const toDate = new Date(reservation.toDate);

                    if (dateToCheck >= fromDate && dateToCheck <= toDate) {
                        isAlreadyReserved = true;
                    }
                });

            return <CustomTableField isReserved={isAlreadyReserved} reservations={reservations} />;
        }else{
            return <CustomTableField isReserved={false}/>
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    };

    return <>
        <tr>
            <th>{args.room.name}</th>
            {Array.from({ length: args.days.length}).map((_, index) => (
                <td key={index}>{getCustomTableField(index)}</td>
            ))}
        </tr>
    </>
}

export default RoomRow;