import { BrowserRouter as Router, Route, Routes } from "react-router";
import { Navigate } from "react-router-dom";

//Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

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

//admin
import AdminHub from "./pages/admin/AdminHub";
import AcceptTutor from "./pages/admin/AcceptTutor";
import ManageNotes from "./pages/admin/ManageNotes";
import ManageUsers from "./pages/admin/ManageUsers";
import ViewReports from "./pages/admin/ViewReports";
import ViewSuggestions from "./pages/admin/ViewSuggestions";
import CreateUser from "./pages/admin/CreateUser";
import UpdateUser from "./pages/admin/UpdateUser";

//settings
import UserProfile from "./pages/settings/UserProfile";
import Settings from "./pages/settings/Settings";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />

        <Route path="/notes">
          <Route
            index
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <NoteView />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path=":id"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <NotePage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="create"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <NoteCreate />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="browse"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <PublicNotesView />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/todos">
          <Route
            index
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <TodoView />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="create"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <TodoCreate />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="/whiteboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Whiteboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route path="/tutors">
          <Route
            index
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <TutorHub />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="create"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <TutorCreateBooking />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path=":id"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <TutorInfo />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/admin">
          <Route index element={<AdminHub />} />
          <Route path="tutors" element={<AcceptTutor />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="notes" element={<ManageNotes />} />
          <Route path="reports" element={<ViewReports />} />
          <Route path="feedbacks" element={<ViewSuggestions />} />
          <Route path="roles" element={<LandingPage />} />
          <Route path="users/create" element={<CreateUser />} />
          <Route path="users/update/:userID" element={<UpdateUser />} />
        </Route>

        <Route path="/">
          <Route index element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<RegisterAndLogout />} />
          <Route path="logout" element={<Logout />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          />
          <Route path="settings">
            <Route index element={<Settings />} />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <UserProfile />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
