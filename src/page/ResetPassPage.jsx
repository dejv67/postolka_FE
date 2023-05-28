import "./css/ResetPassPage.css"
import Image from "react-bootstrap/Image";
import logo from "../images/postolka_logo.jpg";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


const ResetPassPage = () => {

    return(
        <div className="resetDiv">
            <Image src={logo} width="100" height="100" roundedCircle/>
            <h2>Reset hesla</h2>
            <div className="resetFormDiv">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Emailová adresa</Form.Label>
                        <Form.Control required type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Odeslat resetovací email
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default ResetPassPage;