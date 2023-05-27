import Navbar from "../component/NavigationBarOut.jsx"
import "../page/WelcomePage.css"


const WelcomePage = () =>{

    return(
        <>
            <Navbar/>
            <div id="welcome" className="backgroundImg">
                <div className="welcomePageText">
                    <p>Užíj si pobyt na horách!<br/>
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
            <div id="photoGallery" className="windowBlock">
                <h1>Fotogalerie</h1>
            </div>
            <div id="contact" className="windowBlock">
                <h1>Kontakt</h1>
            </div>

        </>
    )
}

export default WelcomePage;