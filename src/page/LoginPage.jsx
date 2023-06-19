import "./css/LoginPage.css"
import Image from 'react-bootstrap/Image';
import logo from "../images/postolka_logo.jpg"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState} from "react";
import {  useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const LoginPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [beError, setBeError] = useState('');
    const navigate = useNavigate();

    //send email and pass to backend
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
                const requestOptionsUser = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        //'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                };

                fetch(`${backendUrl}/user?email=${username}`)
                    .then(async (response) => {
                            if (response.status === 200) {
                                const result = (await response.json());
                                localStorage.setItem('userId', result.id);
                                localStorage.setItem('userFirstName', result.name);
                                localStorage.setItem('userSurname', result.surname);
                                localStorage.setItem('userRole', result.role);
                            } else {
                                throw new Error("Error with loading user");
                            }
                        }
                    )

                console.log(localStorage.getItem('userFirstName'));
                navigate('/home');
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
                        <Nav.Link onClick={() => navigate('/resetPass')} style={{color:"blue"}}>
                            Zapomněl jsi heslo?
                        </Nav.Link>
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Přihlásit se
                    </Button>
                </Form>
            </div>
            <div className="newRegistration">
                <h6>Jsi tu poprvé?</h6>
                <Nav.Link onClick={() => navigate('/registration')} style={{color:"blue"}}>
                    Zaregistruj se.
                </Nav.Link>
            </div>
            {beError && <p style={{color:"red"}}>{beError}</p>}
        </div>
    )
}


export default LoginPage;