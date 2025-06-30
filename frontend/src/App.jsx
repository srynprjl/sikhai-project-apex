import Login from "./Auth/Login";
import Register from "./Auth/Register";
import {BrowserRouter as Router, Route, Routes} from "react-router"
import LandingPage from "./LandingPage/LandingPage"
import DashboardLayout from "./Dashboard/DashboardLayout";
import NoteView from "./Notes/NoteView";
import TodoView from "./Todo/TodoView"
import Whiteboard from "./Whiteboard/Whiteboard";

const App = () => {
    return(
        <Router>
            <Routes>
                <Route path="/dashboard" element={<DashboardLayout />} />
                <Route path="/notes" element={<DashboardLayout><NoteView /></DashboardLayout>} />
                <Route path="/todos" element={<DashboardLayout><TodoView /></DashboardLayout>} />
                <Route path="/whiteboard" element={<DashboardLayout><Whiteboard /></DashboardLayout>} />
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    )
}



export default App