import "./css/Footer.css"
import { ImFacebook2, ImInstagram } from "react-icons/im";


const Footer = () => {

    const copyWrite = '© 2023 Ho Krko';
    const facebookLink = 'https://www.facebook.com/HOKrko';
    const instaLink = 'https://www.instagram.com/ho_krko/';

    return(
        <div className="footer">
            <div className="leftSide">
                <p>{copyWrite}</p>
            </div>
            <div className="rightSide">
                <a className="icon" href={facebookLink} target="_blank" rel="noreferrer"><ImFacebook2/></a>
                {' '}
                <a className="icon" href={instaLink} target="_blank" rel="noreferrer"><ImInstagram/></a>
            </div>
        </div>
    )
}

export default Footer;