import "./css/NavigationBarIn.css"
import Navbar from "react-bootstrap/Navbar";
import logo from "../images/postolka_logo.jpg";
import Nav from "react-bootstrap/Nav";
import AccountMenu from "./AccountMenu";
import {useNavigate} from "react-router-dom";


const NavigationBarIn = () => {

    const navigate = useNavigate();

    return(
        <div className="navInBar">
            <Navbar bg="white" expand="lg" sticky="top">
                    <Navbar.Brand >
                        <img
                            alt=""
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Poštolka rezervační systém
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={() =>  navigate('/home')}>Kalendář rezervací</Nav.Link>
                            <Nav.Link onClick={() =>  navigate('/myReservation')}>Moje rezervace</Nav.Link>
                        </Nav>
                        <AccountMenu/>
                    </Navbar.Collapse>
            </Navbar>
        </div>
  )
}

export default NavigationBarIn;