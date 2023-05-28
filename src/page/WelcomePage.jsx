import "../page/WelcomePage.css"
import Navbar from "../component/NavigationBarOut.jsx"
import Footer from "../component/Footer.jsx";
import Iframe from 'react-iframe';
import { ImLocation2, ImPhone, ImMail3, ImFacebook2, ImInstagram } from "react-icons/im";


const WelcomePage = () =>{

    const facebookLink = 'https://www.facebook.com/HOKrko';
    const instaLink = 'https://www.instagram.com/ho_krko/';

    return(
        <>
            <Navbar/>
            <div id="welcome" className="backgroundImg">
                <div className="welcomePageText">
                    <p>Užij si pobyt na horách!<br/>
                       Kdykoli</p>
                </div>
            </div>
            <div id="info" className="windowBlock">
                <h1>Info</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam delectus error esse excepturi explicabo impedit, in incidunt ipsam iure mollitia nemo nulla placeat praesentium repellat totam ullam unde voluptas!</p>
            </div>
            <div id="accommodation" className="windowBlock">
                <h1>Ubytování</h1>
            </div>
            <div id="contact" className="contact">
                <h1>Kontakt</h1>
                <Iframe url= "https://frame.mapy.cz/s/ladejogotu"
                        width="700px"
                        height="333px"
                        id=""
                        className=""
                        display="block"
                        position="relative"/>
                <div className="contactInfo">
                    <div className="contactLeftSide">
                        <h4>Kontakt</h4>
                        <a href="https://mapy.cz/s/fujoruhetu" target="_blank" rel="noreferrer"><ImLocation2/> Horová 123 <br/> Janské Lázně <br/> 53002</a>
                        <a><ImPhone/> +420 123 456 789</a>
                        <a href="mailto:postolka@info.cz"><ImMail3/> postolka@info.cz</a>
                    </div>
                    <div className="contactSocMedia">
                        <h4>Sociální media</h4>
                        <a href={facebookLink} target="_blank" rel="noreferrer"><ImFacebook2/> Facebook Poštolka</a>
                        <a href={instaLink} target="_blank" rel="noreferrer"><ImInstagram/> Instagram Poštolka</a>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default WelcomePage;