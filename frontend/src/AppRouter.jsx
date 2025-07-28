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
// import ReportFeedbackForm from "./components/form/ReportFeedbackForm";
import Feedback from "./pages/reports/Feedback";
import TutorApplicationForm from "./components/form/TutorApplicationForm";


import ClassroomList from "./pages/tutor_booking/ClassroomList";
import Classroom from "./pages/tutor_booking/Classroom";
import ClassroomManage from "./pages/tutor_booking/ClassroomManage";
import ClassroomCreateUpdateForm from "./pages/tutor_booking/ClassroomCreateUpdateForm";
import AssignmentForm from "./pages/tutor_booking/AssignmentForm";
import CreateUpdateSessionForm from "./pages/tutor_booking/CreateSession";
import ClassroomBookedList from "./pages/tutor_booking/ClassroomBookedList";
import { useEffect, useState } from "react";
import api from "./api";


const AppRouter = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isTutor, setIsTutor] = useState(false)

  useEffect(() => {
    async function getUserInfo() {
      const res = await api.get("/api/user/");
      setIsAdmin(res.data.is_superuser)
      setIsTutor(res.data.is_tutor)
    }

    getUserInfo();
  }, [isAdmin, isTutor])

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
          <Route path="application" element={<TutorApplicationForm />} />
          <Route path="application/:id/" element={<TutorApplicationForm mode={"view"} />} />
        </Route>


        { /* admin */}
        <Route path="/admin">
          <Route index element={<AdminHub isAdmin={isAdmin}/>} />
          <Route path="tutors" element={<AcceptTutor isAdmin={isTutor}/>} />
          <Route path="users" element={<ManageUsers isAdmin={isAdmin}/>} />
          <Route path="notes" element={<ManageNotes isAdmin={isAdmin}/>} />
          <Route path="reports" element={<ViewReports isAdmin={isAdmin}/>} />
          <Route path="feedbacks" element={<ViewSuggestions isAdmin={isAdmin}/>} />
          <Route path="transcations" element={<LandingPage />} />
          <Route path="users/create" element={<CreateUser isAdmin={isAdmin}/>} />
          <Route path="users/update/:userID" element={<UpdateUser isAdmin={isAdmin}/>} />
        </Route>



      {/* random */}
        <Route path="/">
          <Route index element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="logout" element={<LogOut />} />
          <Route path="dashboard" element={<DashboardLayout />} />
          <Route path="profiles" element={<UserProfile />} />
          <Route path="payment" element={<PaymentsStatus />} />
        </Route>

        {/* <Route path="/report">
          <Route path="create" element={< />} />
          <Route path=":id" element={<ReportFeedbackForm mode={"view"} item={"report"} />} />
        </Route> */}

        <Route path="/feedback">
          <Route path="create" element={<Feedback mode={"create"}/>} />
          <Route path=":id" element={<Feedback mode={"view"}/>} />
        </Route>

        {/* errors */}
        <Route path="*" element={<NotFound />} />
        <Route path="/forbidden" element={<Forbidden />} />

          <Route path="/classroom">
          <Route index element={<ClassroomList />}></Route>
          <Route path="booked" element={<ClassroomBookedList />}/>
          <Route path=":id" element={<Classroom isTutor={true} />}></Route>
          <Route path="manage" >
                  <Route index element={<ClassroomManage isTutor={true}/>} />
                  <Route path="new" element={<ClassroomCreateUpdateForm isTutor={true}/>} />
                  <Route path="edit/:id" element={<ClassroomCreateUpdateForm isTutor={true}/>} />
          </Route>
          <Route path=":classroomId">
            <Route path="assignments/new" element={<AssignmentForm isTutor={true}/>} />
            <Route path="sessions/new" element={<CreateUpdateSessionForm isTutor={true}/>} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
