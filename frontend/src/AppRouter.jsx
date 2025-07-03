import { BrowserRouter as Router, Route, Routes } from "react-router";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Landing Page
import LandingPage from "./pages/landing_page/LandingPage";

// Dashboard
import DashboardLayout from "./components/DashboardLayout";

//whiteboard
import Whiteboard from "./pages/whiteboard/Whiteboard";

// todo
import TodoView from "./pages/todo/TodoView";
import TodoCreate from "./pages/todo/TodoCreate";

//notes
import NoteView from "./pages/notes/NoteView";
import NoteCreate from "./pages/notes/NoteCreate";
import NotePage from "./pages/notes/NotePage";
import PublicNotesView from "./pages/notes/PublicNotesView";

// tutors
import TutorHub from "./pages/tutor_booking/TutorHub";
import TutorCreateBooking from "./pages/tutor_booking/TutorCreateBooking";
import TutorInfo from "./pages/tutor_booking/TutorInfo";
// exams

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />} />

        <Route path="/notes">
          <Route
            index
            element={
              <DashboardLayout>
                <NoteView />
              </DashboardLayout>
            }
          />

          <Route
            path=":id"
            element={
              <DashboardLayout>
                <NotePage />
              </DashboardLayout>
            }
          />

          <Route
            path="create"
            element={
              <DashboardLayout>
                <NoteCreate />
              </DashboardLayout>
            }
          />

          <Route
            path="browse"
            element={
              <DashboardLayout>
                <PublicNotesView />
              </DashboardLayout>
            }
          />
        </Route>

        <Route path="/todos">
          <Route
            index
            element={
              <DashboardLayout>
                <TodoView />
              </DashboardLayout>
            }
          />

          <Route
            path="create"
            element={
              <DashboardLayout>
                <TodoCreate />
              </DashboardLayout>
            }
          />
        </Route>

        <Route
          path="/whiteboard"
          element={
            <DashboardLayout>
              <Whiteboard />
            </DashboardLayout>
          }
        />

        <Route path="/tutors">
          <Route
            index
            element={
              <DashboardLayout>
                <TutorHub />
              </DashboardLayout>
            }
          />

          <Route
            path="create"
            element={
              <DashboardLayout>
                <TutorCreateBooking />
              </DashboardLayout>
            }
          />

          <Route
          path=":id"
          element={
            <DashboardLayout><TutorInfo /></DashboardLayout>
          } 
          />

        </Route>

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
