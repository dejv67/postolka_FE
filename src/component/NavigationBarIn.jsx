import "./css/NavigationBarIn.css"
import Navbar from "react-bootstrap/Navbar";
import logo from "../images/postolka_logo.jpg";
import Nav from "react-bootstrap/Nav";
import AccountMenu from "./AccountMenu";


const NavigationBarIn = () => {

    return(
        <div className="navInBar">
            <Navbar bg="white" expand="lg" sticky="top">
                    <Navbar.Brand href="/home">
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
                            <Nav.Link href="/home">Kalendář rezervací</Nav.Link>
                            <Nav.Link href="/myReservation">Moje rezervace</Nav.Link>
                            <Nav.Link href="/#contact">Kontakt</Nav.Link>
                        </Nav>
                        <AccountMenu/>
                    </Navbar.Collapse>
            </Navbar>
        </div>
  )
}

export default NavigationBarIn;