import "./css/ReservationSystem.css"
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import {addDays, endOfWeek, startOfWeek} from "date-fns";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import {useEffect, useState, useRef} from "react";
import RoomRow from "./RoomRow.jsx";
import ReservateModalDialog from "./ReservateModalDialog.jsx";

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
    const [modalShow, setModalShow] = useState(false);
    const [intervalError, setIntervalError] = useState('');
    const rowsIntervalStates = useRef([]);
    const isAnyRowIntervalFalse = useRef(false);
    const haveRoomsSameInterval = useRef(true);
    const noDateChosen = useRef(true);
    const reservationInfo = useRef({});
    const alertVariant = useRef('');
    const alertValue = useRef('');
    const [showAlert, setShowAlert] = useState(false);
    const setClicked = useRef(false);

    const deleteRoomDates = () => {
        for (let i = 0; i <= rowsIntervalStates.current.length -1; i++){
            rowsIntervalStates.current[i].dates = [];
        }
    }

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
        resetStates();

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

        resetStates();
    }

    const resetStates = () => {
        isAnyRowIntervalFalse.current = false;
        haveRoomsSameInterval.current = true;
        deleteRoomDates();
    };

    const [days, setDays] = useState(createInitialDatesRange);
    const [loading, setLoading] = useState(true)
    const [rooms, setRooms] = useState([]);

    //TODO nacpat
    //         isAnyRowIntervalFalse.current = false;
    //         haveRoomsSameInterval.current = true;
    //         deleteRoomDates();
    //         do useEffectu a ten spoustet jen na urcitou zmenu, ale treba po tlacitku Rezervovat to nedelat, jen treba pri zemene datumu
    //         !!Zaroven taky vyresit prebarveni policek zpet jen pri zmene datumu, ne pri preklesneni kvuli ModalDialogu nebo kvuli chybove hlasce... Predat
    //         skrz props/args a pak to co se zmenilo dat jako podminku do useEffectu

    useEffect(() => {
        fetchRooms();
    }, []);

    useEffect(() => {
        //initialization loading IDs of rooms to rowsIntervalStates (and also after rooms change)
        rooms.map((room) => (
            rowsIntervalStates.current = [...rowsIntervalStates.current, {id: room.id, name: room.name, isIntervalRight: true, dates: []}]
        ));
    }, [rooms]);

    useEffect(() => {
        // Show the alert
        setShowAlert(true);

        // Hide the alert after 3 seconds
        const timeout = setTimeout(() => {
            setShowAlert(false);
        }, 3000);

        // Clean up the timeout
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    const fetchRooms = async () => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        const result = await fetch(`${backendUrl}/room`);
        setRooms(await (result.json()));
        setLoading(false);
    };

    const handleRoomValueChange = (isIntervalRight, roomId, clickedDates) => {
        //TODO tady dostanu boolean jeslti je vse v poradku a bud vyhodim chybovou hlasku nebo otevru form pro vytvoreni rezervace
        const foundIndex = rowsIntervalStates.current.findIndex(item => item.id === roomId);
        let tempObject = rowsIntervalStates.current[foundIndex];
        tempObject.isIntervalRight = isIntervalRight;
        tempObject.dates = [...clickedDates];
        rowsIntervalStates.current[foundIndex] = tempObject;
    };

    const checkRows = () => {
        isAnyRowIntervalFalse.current = false;
        haveRoomsSameInterval.current = true;
        noDateChosen.current = true;
        let testDates = [];
        setIntervalError('');
        const resInfo = {startDate: '', endDate: '', rooms: [], roomIds: []};

        rowsIntervalStates.current.forEach((item) => {
            if (!item.isIntervalRight) isAnyRowIntervalFalse.current = true;

            if (item.dates.length > 0){
                noDateChosen.current = false;
                if (testDates.length === 0){
                    testDates = [...item.dates];
                    resInfo.startDate = item.dates[0];
                    resInfo.endDate = item.dates[item.dates.length - 1]
                    resInfo.rooms = [...resInfo.rooms, item.name];
                    resInfo.roomIds = [...resInfo.roomIds, item.id];
                }else{
                    if (testDates.length === item.dates.length){
                        let isRowOk = true;
                        for (let i = 0; i <= testDates.length -1; i++){
                            if (testDates[i] != item.dates[i]){
                                haveRoomsSameInterval.current = false;
                                isRowOk = false;
                                break;
                            }
                        }
                        if (isRowOk){
                            resInfo.rooms = [...resInfo.rooms, item.name];
                            resInfo.roomIds = [...resInfo.roomIds, item.id];
                        }
                    }else{
                        haveRoomsSameInterval.current = false;
                    }
                }
            }
        });

        reservationInfo.current = resInfo;

        isAnyRowIntervalFalse.current ? console.log("%cNespojity interval!", 'color: red') : console.log("%cIntervaly OK.", 'color: green');

        haveRoomsSameInterval.current ? console.log("%cIntervaly pokoju OK.", 'color: green') : console.log("%cPokoje maji rozdilne intervaly.", 'color: red');

        console.log(rowsIntervalStates.current);

        if (!isAnyRowIntervalFalse.current && haveRoomsSameInterval.current && !noDateChosen.current){
            setModalShow(true);
        }else if (noDateChosen.current){
            setIntervalError('Není vybrané žádné datum.');
        }else{
            isAnyRowIntervalFalse.current ? setIntervalError('Nespojitý interval pro pokoj.') : setIntervalError('Pokoje mají rozdílné intervaly.');
        }
    }

    const setResponseStatus  = (responseStatus) => {
        if (responseStatus == 200){
            console.log("SUCCESS");
            alertVariant.current = 'success';
            alertValue.current = 'Rezervace úspěšně odeslána.';
        }else{
            alertVariant.current = 'danger';
            alertValue.current = 'Rezervaci se nepodařilo odeslat. (error code: ' + responseStatus + ')';
        }

        setShowAlert(true);

        // Hide the alert after 3 seconds
        const timeout = setTimeout(() => {
            alertValue.current = '';
            setShowAlert(false);
        }, 3000);

        resetStates();
        setDays([...days]);

        // Clean up the timeout
        return () => {
            clearTimeout(timeout);
        };
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
            <Table responsive="lg" >
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
                        <RoomRow key={room.id} room={room} days={days} callback={handleRoomValueChange} clicked={setClicked.current} />
                    ))}
                </tbody>
            </Table>
            <div className="legendDiv">
                <p style={{marginTop:"0px", marginRight:"25px", fontWeight:"bold"}}>Legenda: </p>
                <p style={{color:"green", marginTop:"0px", marginRight:"25px", fontWeight:"bold"}}>dostupné </p>
                <p style={{color:"orange", marginTop:"0px", fontWeight:"bold" }}>zvolené </p>
                <p style={{color:"grey", marginTop:"0px",marginLeft:"25px", fontWeight:"bold"}}>rezervováno </p>
            </div>
            <Button variant="success" onClick={checkRows} >
                Rezervovat
            </Button>
            {intervalError && <p style={{color:"red"}}>{intervalError}</p>}
            <br/>
            {alertValue.current && (<Alert variant={alertVariant.current} onClose={() => alertValue.current = ''} dismissible>{alertValue.current}</Alert>)}
            <ReservateModalDialog
                show={modalShow}
                onHide={() => setModalShow(false)}
                resinfo={reservationInfo.current}
                getresponsestatus={setResponseStatus}
            />
        </div>
    );
}

export default ReservationSystem;