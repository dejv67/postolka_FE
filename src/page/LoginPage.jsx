import "./css/LoginPage.css"
import Image from 'react-bootstrap/Image';
import logo from "../images/postolka_logo.jpg"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const LoginPage = () => {

    // const formSubmit = (event) =>{
    //      event.preventDefault();
    // }

    return(
        <div className="loginDiv">
            <Image src={logo} width="100" height="100" roundedCircle/>
            <h2>Přihlaš se do rezervačního systému Poštolky</h2>
            <div className="formDiv">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Emailová adresa</Form.Label>
                        <Form.Control required type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Heslo</Form.Label>
                        <Form.Control required type="password" placeholder="Password" />
                        <a href="/resetPass">Zapomněl jsi heslo?</a>
                    </Form.Group>
                    {/*TODO odebrat pak href a pridat logiku*/}
                    <Button variant="success" type="submit" href="/home" >
                        Přihlásit se
                    </Button>
                </Form>
            </div>
            <div className="newRegistration">
                <h6>Jsi tu poprvé?</h6>
                <a href="/registration">Zaregistruj se.</a>
            </div>
        </div>
    )
}

export default LoginPage;