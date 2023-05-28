import "./css/WelcomePage.css"
import Navbar from "../component/NavigationBarOut"
import Footer from "../component/Footer";
import Iframe from 'react-iframe';
import { ImLocation2, ImPhone, ImMail3, ImFacebook2, ImInstagram } from "react-icons/im";



const WelcomePage = () =>{

    const facebookLink = 'https://www.facebook.com/HOKrko';
    const instaLink = 'https://www.instagram.com/ho_krko/';

    return(
        <div>
            <Navbar/>
            <div id="welcome" className="backgroundImg">
                <div className="welcomePageText">
                    <p>Užij si pobyt na horách!<br/>
                        Kdykoli</p>
                </div>
            </div>
            <div id="info" className="windowBlock">
                <h1>Info</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam delectus error esse excepturi explicabo impedit, in incidunt ipsam iure mollitia nemo nulla placeat praesentium repellat totam ullam unde voluptas! <br/>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam delectus error esse excepturi explicabo impedit, in incidunt ipsam iure mollitia nemo nulla placeat praesentium repellat totam ullam unde voluptas!
                    <br/><br/>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet aspernatur autem, consequuntur corporis ea esse, eveniet excepturi facere nulla reiciendis rem similique sunt. Architecto, possimus quae. Earum, ipsam, temporibus!</p>
            </div>
            <div id="accommodation" className="windowBlock">
                <h1>Ubytování</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam delectus error esse excepturi explicabo impedit, in incidunt ipsam iure mollitia nemo nulla placeat praesentium repellat totam ullam unde voluptas! <br/>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam delectus error esse excepturi explicabo impedit, in incidunt ipsam iure mollitia nemo nulla placeat praesentium repellat totam ullam unde voluptas!
                    <br/><br/>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet aspernatur autem, consequuntur corporis ea esse, eveniet excepturi facere nulla reiciendis rem similique sunt. Architecto, possimus quae. Earum, ipsam, temporibus!</p>
                <div className="accommodationPictures">
                    <img src="https://www.drevoastavby.cz/cache/xart_thumbnails/af/9/e72daec0411a03661c3ef0b0e67e0480.jpg" width="400" height="250"/>
                    <img src="https://www.taurushaus.cz/files/ARTIS/drevostavba_chata_taurushaus_artis_1.jpeg" width="400" height="250"/>
                    <img src="https://www.cohab.cz/files/koncepty/a_chata/a_chata_02_vizo1_hotovo.jpg" width="400" height="250"/>
                </div>
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
        </div>

    )
}

export default WelcomePage;