import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import CustomTableField from "./CustomTableField.jsx";
import {useEffect, useState, useRef} from "react";

const RoomRow = (args) => {

    const [reservations, setReservations] = useState([]);
    const isIntervalRight = useRef(true);
    let clickedDates = [];

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

        await fetch(`${backendUrl}/room/roomReservations?roomId=${id}&fromDate=${fromDate.toISOString()}&toDate=${toDate.toISOString()}`, requestOptions)
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
        const dateToCheck = new Date(formatDate(args.days[index]));
        if (reservations != null && reservations.length > 0){
            let isAlreadyReserved = false;

            reservations.forEach((reservation) => {
                    const fromDate = new Date(reservation.fromDate);
                    const toDate = new Date(reservation.toDate);

                    if (dateToCheck >= fromDate && dateToCheck <= toDate) {
                        isAlreadyReserved = true;
                    }
                });

            return <CustomTableField isReserved={isAlreadyReserved} date={formatDate(dateToCheck)} callbackClicked={checkDateInterval} />;
        }else{
            return <CustomTableField isReserved={false} date={formatDate(dateToCheck)} callbackClicked={checkDateInterval}/>
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

    const checkDateInterval = (date, isClicked) => {
        //condition is !isClicked because useState in CustomTableField change clicked variable after finish function in (handleClick)
        if (!isClicked) {
            clickedDates = [...clickedDates, new Date(date)];
        } else {
            const foundIndex = clickedDates.findIndex(item => formatDate(item) == date);
            if (foundIndex !== -1) {
                const tempClickedDates = clickedDates.filter((item, index) => index !== foundIndex);
                clickedDates = tempClickedDates;
            }
        }

        const sortedClickedDates = clickedDates.sort((a, b) => a - b);
        if (sortedClickedDates.length > 1) {
            let isRight = true;
            for (let i = 1; i <= sortedClickedDates.length - 1; i++) {
                const testDate = new Date();
                testDate.setFullYear(sortedClickedDates[i - 1].getFullYear());
                testDate.setMonth(sortedClickedDates[i - 1].getMonth())
                testDate.setDate(sortedClickedDates[i - 1].getDate() + 1);
                if (formatDate(testDate) != formatDate(sortedClickedDates[i])) {
                    isRight = false;
                }
            }
            isIntervalRight.current = isRight;
        } else {
            isIntervalRight.current = true;
        }

        let tempFormatedDates = [...sortedClickedDates];
        for (let i = 0; i <= tempFormatedDates.length -1; i++){
            const tempDate = formatDate(tempFormatedDates[i]);
            tempFormatedDates[i] = tempDate;
        }
        args.callback(isIntervalRight.current, args.room.id, tempFormatedDates);
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            <span>počet postelí: {args.room.numOfBeds}</span>
            <br/>
            <span>poznámka: {args.room.description}</span>
        </Tooltip>
    );

    return <>
        <tr>
            <OverlayTrigger
                placement="left"
                delay={{ show: 50, hide: 500 }}
                overlay={renderTooltip}
            >
                <th>{args.room.name}</th>
            </OverlayTrigger>
            {Array.from({ length: args.days.length}).map((_, index) => (
                <td key={index}>{getCustomTableField(index)}</td>
            ))}
        </tr>
    </>
};

export default RoomRow;