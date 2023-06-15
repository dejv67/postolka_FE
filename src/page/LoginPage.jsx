import "./css/LoginPage.css"
import Image from 'react-bootstrap/Image';
import logo from "../images/postolka_logo.jpg"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from "react";
import {Link} from "react-router-dom";

const LoginPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [beError, setBeError] = useState('');

    const fetchData = () => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password}),
        };

        fetch(`${backendUrl}/login/`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    setBeError('Invalid username or password');
                    throw new Error('Request failed with status ' + response.status);
                }
            })
            .then((data) => {
                localStorage.setItem('token', data.token);
                window.location.href = '/home';
            })
            .catch((error) => {
                // Handle the error
                console.error('Request failed:', error);
            });
    }


    const formSubmit = (event) =>{
        event.preventDefault();
        fetchData();
    }

    return(
        <div className="loginDiv">
            <Image src={logo} width="100" height="100" roundedCircle/>
            <h2>Přihlaš se do rezervačního systému Poštolky</h2>
            <div className="formDiv">
                <Form onSubmit={formSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Emailová adresa</Form.Label>
                        <Form.Control required type="email" placeholder="Enter email" value={username} onChange={(e) => {setUsername(e.target.value); setBeError('')}} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Heslo</Form.Label>
                        <Form.Control required type="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value); setBeError('')}} />
                        <Link to="/resetPass">
                            Zapomněl jsi heslo?
                        </Link>
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Přihlásit se
                    </Button>
                </Form>
            </div>
            <div className="newRegistration">
                <h6>Jsi tu poprvé?</h6>
                <Link to="/registration">
                    Zaregistruj se.
                </Link>
            </div>
            {beError && <p style={{color:"red"}}>{beError}</p>}
        </div>
    )
}


export default LoginPage;