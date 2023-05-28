import "./css/RegistrationPage.css"
import Image from "react-bootstrap/Image";
import logo from "../images/postolka_logo.jpg";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


const RegistrationPage = () => {

    return(
        <div className="registrationDiv">
            <Image src={logo} width="100" height="100" roundedCircle/>
            <h2>Registrace</h2>
            <div className="regFormDiv">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Jméno</Form.Label>
                        <Form.Control required type="text" placeholder="Enter name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Příjmení</Form.Label>
                        <Form.Control required type="text" placeholder="Enter surname" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Emailová adresa</Form.Label>
                        <Form.Control required type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Heslo</Form.Label>
                        <Form.Control required type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Registrovat se
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default RegistrationPage;
