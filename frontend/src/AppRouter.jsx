import { BrowserRouter as Router, Route, Routes, RouterProvider } from "react-router";
import { Navigate } from "react-router-dom";

//Protected Route
import ProtectedRoute from "./components/layouts/ProtectedRoute";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import LogOut from "./pages/auth/LogOut";

// Landing Page
import LandingPage from "./pages/landing_page/LandingPage";

// Dashboard
import DashboardLayout from "./components/layouts/DashboardLayout";

//whiteboard
import Whiteboard from "./pages/whiteboard/Whiteboard";

// todo
import TodoView from "./pages/todo/TodoView";

//notes
import NoteView from "./pages/notes/NoteView";
import NoteCreate from "./pages/notes/NoteCreate";
import NotePage from "./pages/notes/NotePage";
import PublicNotesView from "./pages/notes/PublicNotesView";

// tutors
import TutorHub from "./pages/tutor_booking/TutorBookingHub";
import TutorCreateBooking from "./pages/tutor_booking/BookingCreateUpdate";
import TutorInfo from "./pages/tutor_booking/TutorInformation";

//admin
import AdminHub from "./pages/admin/AdminHub";
import AcceptTutor from "./pages/admin/AcceptTutor";
import ManageNotes from "./pages/admin/ManageNotes";
import ManageUsers from "./pages/admin/ManageUsers";
import ViewReports from "./pages/admin/ViewReports";
import ViewSuggestions from "./pages/admin/ViewSuggestions";

// exams
import CreateUser from "./pages/admin/CreateUser";
import UpdateUser from "./pages/admin/UpdateUser";

//settings
import UserProfile from "./pages/settings/UserProfile";

//errors
import NotFound from "./pages/errors/NotFoundError";
import Forbidden from "./pages/errors/Forbidden"
import PaymentsStatus from "./pages/payments/PaymentsStatus";
import ReportFeedbackForm from "./components/form/ReportFeedbackForm";
import TutorApplicationForm from "./components/form/TutorApplicationForm";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* notes */}
        <Route path="/notes">
          <Route index element={<NoteView />} />
          <Route path=":id" element={<NotePage />} />
          <Route path="create" element={<NoteCreate />} />
          <Route path="browse" element={<PublicNotesView />} />
        </Route>

        {/* todos */}
        <Route path="/todos">
          <Route index element={<TodoView />} />
        </Route>

        {/* whiteboard */}
        <Route path="/whiteboard" element={<Whiteboard />} />

        {/* tutors */}
        <Route path="/tutors">
          <Route index element={<TutorHub />} />
          <Route path="create" element={<TutorCreateBooking />} />
          <Route path=":id" element={<TutorInfo />} />
          <Route path="application" element={<TutorApplicationForm />} />
          <Route path="application/:id" element={<TutorApplicationForm mode={"view"} />} />
        </Route>


        { /* admin */}
        <Route path="/admin">
          <Route index element={<AdminHub />} />
          <Route path="tutors" element={<AcceptTutor />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="notes" element={<ManageNotes />} />
          <Route path="reports" element={<ViewReports />} />
          <Route path="feedbacks" element={<ViewSuggestions />} />
          <Route path="transcations" element={<LandingPage />} />
          <Route path="users/create" element={<CreateUser />} />
          <Route path="users/update/:userID" element={<UpdateUser />} />
        </Route>



      {/* random */}
        <Route path="/">
          <Route index element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="logout" element={<LogOut />} />
          <Route path="dashboard" element={<DashboardLayout />} />
          <Route path="profiles" element={<UserProfile />} />
          <Route path="payments" element={<PaymentsStatus />} />
        </Route>

        <Route path="/report">
          <Route path="create" element={<ReportFeedbackForm mode={"create"} item={"report"} />} />
          <Route path=":id" element={<ReportFeedbackForm mode={"view"} item={"report"} />} />
        </Route>

        <Route path="/feedback">
          <Route path="create" element={<ReportFeedbackForm mode={"create"} item={"feedback"} />} />
          <Route path=":id" element={<ReportFeedbackForm mode={"view"} item={"feedback"} />} />
        </Route>

        {/* errors */}
        <Route path="*" element={<NotFound />} />
        <Route path="/forbidden" element={<Forbidden />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
