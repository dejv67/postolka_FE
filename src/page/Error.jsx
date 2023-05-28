import {Link} from "react-router-dom";


const ErrorPage = () => {

    return(
        <div>
            <h2>Error</h2>
            <p>Stránka nenalezena</p>
            <Link to="/">Úvodní stránka</Link>
        </div>
    )
}

export default ErrorPage;