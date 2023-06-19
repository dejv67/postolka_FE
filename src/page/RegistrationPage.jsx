import "./css/RegistrationPage.css"
import Image from "react-bootstrap/Image";
import logo from "../images/postolka_logo.jpg";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


const RegistrationPage = () => {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }else{
            fetchData()
                .then((responseStatus) => {
                    navigate('/login');
                })
                .catch((error) => {
                    console.error('Request failed:', error);
                });
        }
    }

    //send POST method to backend
    const fetchData = () => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        const modifDate = new Date();
        const role = "USER";

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, modifDate, name, password, role, surname})
        };

        return fetch(`${backendUrl}/user/`, requestOptions)
            .then((response) => {
                const responseStatus = response.status;
                return responseStatus;
            })
            .catch((error) => {
                // Handle the error
                console.error('Request failed:', error);
            });
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
                        <Form.Control required type="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value); setError('')}}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Potvrzení hesla {error && <span style={{ color: "red" }}>&emsp;{error}</span>}</Form.Label>
                        <Form.Control required type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value); setError('')}}/>
                    </Form.Group>

                    <Button variant="success" type="submit" onClick={handleSubmit}>
                        Registrovat se
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default RegistrationPage;
