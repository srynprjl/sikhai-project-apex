import { BrowserRouter as Router, Route, Routes } from "react-router";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Landing Page
import LandingPage from "./pages/landing_page/LandingPage";

// Dashboard
import DashboardLayout from "./pages/dashboard/DashboardLayout";


//whiteboard
import Whiteboard from "./pages/whiteboard/Whiteboard";

// todo
import TodoView from "./pages/todo/TodoView";
import TodoCreate from "./pages/todo/TodoCreate";

//notes
import NoteView from "./pages/notes/NoteView";
import NoteCreate from "./pages/notes/NoteCreate";
import NotePage from "./pages/notes/components/NotePage";
import PublicNotesView from "./pages/notes/PublicNotesView";

// tutors



// exams

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route
          path="/notes"
          element={
            <DashboardLayout>
              <NoteView />
            </DashboardLayout>
          }
        />
        <Route
          path="/notes/:id"
          element={
            <DashboardLayout>
              <NotePage />
            </DashboardLayout>
          }
        />
        <Route
          path="/notes/create"
          element={
            <DashboardLayout>
              <NoteCreate />
            </DashboardLayout>
          }
        />

        <Route
          path="/notes/browse"
          element={
            <DashboardLayout>
              <PublicNotesView />
            </DashboardLayout>
          }
        />


        <Route
          path="/todos"
          element={
            <DashboardLayout>
              <TodoView />
            </DashboardLayout>
          }
        />
        <Route
          path="/todos/create"
          element={
            <DashboardLayout>
              <TodoCreate />
            </DashboardLayout>
          }
        />
        <Route
          path="/whiteboard"
          element={
            <DashboardLayout>
              <Whiteboard />
            </DashboardLayout>
          }
        />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
