import "./css/ReservationSystem.css"
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import {addDays, endOfWeek, startOfWeek} from "date-fns";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {useState} from "react";
import CustomTableField from "./CustomTableField.jsx"

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

    // TOHLE JSOU JEN DATA PRO VYVOJ!!!
const rooms = [
        {id: 1, name: "Pokoj 1", state: "obsazeno"},
        {id: 2, name: "Pokoj 2", state: "volno"},
        {id: 3, name: "Pokoj 3", state: "obsazeno"},
        {id: 4, name: "Pokoj 4", state: "schvalovani"},
        {id: 5, name: "Pokoj 5", state: "volno"}
]

// const Row = (props) => {
//     const{name, state} = props;
//     return(
//         <tr>
//             <td>{name}</td>
//             <td>{state}</td>
//             <td>{state}</td>
//             <td>{state}</td>
//             <td>{state}</td>
//             <td>{state}</td>
//             <td>{state}</td>
//             <td>{state}</td>
//         </tr>
//     )
// }

// const Table = (props) => {
//     const {data} = props
//     return(
//         <table>
//             <tbody>
//             {data.map(row =>
//                 <Row name = {row.name} state = {row.state}/>
//             )}
//             </tbody>
//         </table>
//     )
// }



const ReservationSystem = () => {

    // const[rows, setRows] = useState(rooms)
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
                    {rooms.map((room, index) => (
                        <tr key={index}>
                            <th>{room.name}</th>
                            {Array.from({ length: days.length }).map((_, index) => (
                                <td key={index}>{<CustomTableField/>}</td>
                            ))}
                        </tr>
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