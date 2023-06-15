import logo from "../images/postolka_logo.jpg"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";


const NavigationBarOut = () => {

    return(
        <Navbar bg="white" expand="lg" sticky="top">
            <Container >
                <Navbar.Brand href="#welcome">
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Poštolka
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#info">Info</Nav.Link>
                        <Nav.Link href="#accommodation">Ubytování</Nav.Link>
                        <Nav.Link href="#contact">Kontakt</Nav.Link>
                    </Nav>
                    <Link to="/login">
                        <Button variant="outline-secondary">Přihlásit se</Button>
                    </Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBarOut;