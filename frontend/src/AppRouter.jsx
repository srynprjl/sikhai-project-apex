import { BrowserRouter as Router, Route, Routes } from "react-router";

// Auth Pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// Landing Page
import LandingPage from "./pages/LandingPage/LandingPage";

// Dashboard
import DashboardLayout from "./pages/Dashboard/DashboardLayout";


//whiteboard
import Whiteboard from "./pages/Whiteboard/Whiteboard";

// todo
import TodoView from "./pages/Todo/TodoView";
import TodoCreate from "./pages/Todo/TodoCreate";

//notes
import NoteView from "./pages/Notes/NoteView";
import NoteCreate from "./pages/Notes/NoteCreate";
import NotePage from "./pages/Notes/components/NotePage";
import PublicNotesView from "./pages/Notes/PublicNotesView";

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
