import Login from "./Auth/Login";
import Register from "./Auth/Register";
import {BrowserRouter as Router, Route, Routes} from "react-router"
import LandingPage from "./LandingPage/LandingPage"
import DashboardLayout from "./Dashboard/DashboardLayout";

const App = () => {
    return(
        <Router>
            <Routes>
                <Route path="/dashboard" element={<DashboardLayout />} />
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    )
}



export default App