import NavigationBarIn from "../component/NavigationBarIn.jsx";
import ListGroup from 'react-bootstrap/ListGroup';


const MyReservationsPage = () => {
    return(
        <div>
            <NavigationBarIn/>
            <ListGroup as="ol" numbered>
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                    style={{backgroundColor:"lightgreen"}}
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Rezervace 15.6.2023 - 20.6.2023 </div>
                        Pokoje: Pokoj 1, Pokoj 2 <br/> stav: schvaleno
                    </div>
                </ListGroup.Item>
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                    style={{backgroundColor:"#FF4F4B"}}
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Rezervace 28.6.2023 - 30.6.2023</div>
                        Pokoje: Pokoj 2, Pokoj 4 <br/> stav: zamítnuto
                    </div>
                </ListGroup.Item>
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                    style={{backgroundColor:"lightgray"}}
                >
                    <div className="ms-2 me-auto" >
                        <div className="fw-bold">Rezervace 4.7.2023 - 10.7.2023</div>
                        Pokoje: Pokoj 3 <br/> stav: čeká na schválení
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </div>
    )
}

export default MyReservationsPage;