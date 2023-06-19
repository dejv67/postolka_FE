import "./css/RegistrationPage.css"
import Image from "react-bootstrap/Image";
import logo from "../images/postolka_logo.jpg";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useState} from "react";


const RegistrationPage = () => {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
    }

    return(
        <div className="registrationDiv">
            <Image src={logo} width="100" height="100" roundedCircle/>
            <h2>Registrace</h2>
            <div className="regFormDiv">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Jméno</Form.Label>
                        <Form.Control required type="text" placeholder="Enter name" value={name} onChange={(e) => {setName(e.target.value)}}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Příjmení</Form.Label>
                        <Form.Control required type="text" placeholder="Enter surname" value={surname} onChange={(e) => {setSurname(e.target.value)}}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Emailová adresa</Form.Label>
                        <Form.Control required type="email" placeholder="Enter email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Heslo</Form.Label>
                        <Form.Control required type="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Potvrzení hesla</Form.Label>
                        <Form.Control required type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                    </Form.Group>

                    <Button variant="success" type="submit" onClick={handleSubmit}>
                        Registrovat se
                    </Button>
                </Form>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </div>
    )
}

export default RegistrationPage;
