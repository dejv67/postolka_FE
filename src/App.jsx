import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import WelcomePage from "./page/WelcomePage.jsx";
import LoginPage from "./page/LoginPage.jsx";
import ErrorPage from "./page/Error";
import ResetPassPage from "./page/ResetPassPage.jsx";
import RegistrationPage from "./page/RegistrationPage.jsx";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path= "/" element={<WelcomePage/>}/>
              <Route path= "/login" element={<LoginPage/>}/>
              <Route path= "/resetPass" element={<ResetPassPage/>}/>
              <Route path= "/registration" element={<RegistrationPage/>}/>
              <Route path= "*" element={<ErrorPage/>}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App
