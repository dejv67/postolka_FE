import "./css/ReservationSystem.css"
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import {addDays, endOfWeek, startOfWeek} from "date-fns";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {useEffect, useState} from "react";
import RoomRow from "./RoomRow.jsx";

const { allowedMaxDays, beforeToday, combine } =
    DateRangePicker;

const predefinedRanges = [
    {
        label: 'Tento víkend',
        closeOverlay: false,
        value: () => {
            const [start = new Date()] = [];
            return [
                addDays(startOfWeek(start, { weekStartsOn: 1 }), 5),
                addDays(endOfWeek(start, { weekStartsOn: 1 }), 0)
            ];
        },
        appearance: 'default'
    },
    {
        label: 'Příští týden',
        closeOverlay: false,
        value: () => {
            const [start = new Date()] =  [];
            return [
                addDays(startOfWeek(start, { weekStartsOn: 1 }), 7),
                addDays(endOfWeek(start, { weekStartsOn: 1 }), 7)
            ];
        },
        appearance: 'default'
    },
    {
        label: 'Příští víkend',
        closeOverlay: false,
        value: () => {
            const [start = new Date()] = [];
            return [
                addDays(startOfWeek(start, { weekStartsOn: 1 }), 12),
                addDays(endOfWeek(start, { weekStartsOn: 1 }), 7)
            ];
        },
        appearance: 'default'
    }
    ]

const ReservationSystem = () => {

    const [areInitialDatesUsed, setAreInitialDatesUsed] = useState(false);

    const createInitialDatesRange = () =>{
        const dates = [];
        const currentDate = new Date();
        const toDate = new Date();
        toDate.setDate(currentDate.getDate() + 6)

        while (currentDate <= toDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        setAreInitialDatesUsed(true);
        return dates;
    }

    const createDatesRange = (event) =>{
        const fromDate = event[0];
        const toDate = event[1];

        const dates = [];
        const currentDate = new Date(fromDate);

        while (currentDate <= toDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        setAreInitialDatesUsed(false);
        setDays([...dates]);
    }

    const [days, setDays] = useState(createInitialDatesRange);

    const [loading, setLoading] = useState(true)
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        const result = await fetch(`${backendUrl}/room`);
        setRooms(await (result.json()));
        setLoading(false);
    };

    return(
        // Vyber data
        <div className="resSysDiv">
            <h3>Vyber datum</h3>
            <h6>(max 7 dnů)</h6>
            <DateRangePicker
                size="lg"
                appearance="default"
                placeholder="Vyber rozmezí dnů"
                isoWeek={true}
                shouldDisableDate={combine(allowedMaxDays(7), beforeToday())}
                ranges={predefinedRanges}
                onOk = {(event) => createDatesRange(event)}
                onClean = {() => {!areInitialDatesUsed ? setDays(createInitialDatesRange) : null}}
            />

            {loading && <div>Loading ...</div>}

            {/*Tabulka obsazenosti*/}
            <Table responsive >
                <thead>
                    <tr>
                        <th>Pokoj\Datum</th>
                        {days.map((day, index) => (
                            <th key={index}>
                                {day.toLocaleString('cs-CZ', { day: 'numeric', month: 'numeric' })}
                                <br/>
                                {day.toLocaleString('cs-CZ', {weekday: 'long'})}
                                </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room) => (
                        <RoomRow key={room.id} room={room} days={days} />
                    ))}
                </tbody>
            </Table>
            <div className="legendDiv">
                <p style={{marginTop:"0px", marginRight:"25px", fontWeight:"bold"}}>Legenda: </p>
                <p style={{color:"green", marginTop:"0px", marginRight:"25px", fontWeight:"bold"}}>dostupné </p>
                <p style={{color:"orange", marginTop:"0px", fontWeight:"bold" }}>zvolené </p>
                <p style={{color:"grey", marginTop:"0px",marginLeft:"25px", fontWeight:"bold"}}>rezervováno </p>
            </div>
            <Button variant="success">
                Rezervovat
            </Button>
        </div>
    );
}

export default ReservationSystem;