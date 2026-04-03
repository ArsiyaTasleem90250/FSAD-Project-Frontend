import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Report from "../pages/Report";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AddSubmission from "../pages/AddSubmission";
import Marking from "../pages/Marking";
import MyLearningOutcomes from "../pages/MyLearningOutcomes";
import FacultyLearningOutcomes from "../pages/FacultyLearningOutcomes";
import Courses from "../pages/Courses";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";

function HomeRoute() {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : <Home />;
}

function LoginRoute() {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : <Login />;
}

function SignupRoute() {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : <Signup />;
}

function RequireStudent({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "Student") return <Navigate to="/marking" replace />;
  return children;
}

function RequireUser({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "Admin") return <Navigate to="/add-submission" replace />;
  return children;
}

function RequireAuth({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/report" element={<Report />} />
      <Route path="/login" element={<LoginRoute />} />
      <Route path="/signup" element={<SignupRoute />} />
      <Route
        path="/add-submission"
        element={
          <RequireStudent>
            <AddSubmission />
          </RequireStudent>
        }
      />
      <Route
        path="/courses"
        element={
          <RequireAuth>
            <Courses />
          </RequireAuth>
        }
      />
      <Route
        path="/my-outcomes"
        element={
          <RequireStudent>
            <MyLearningOutcomes />
          </RequireStudent>
        }
      />
      <Route
        path="/marking"
        element={
          <RequireUser>
            <Marking />
          </RequireUser>
        }
      />
      <Route
        path="/learning-outcomes"
        element={
          <RequireUser>
            <FacultyLearningOutcomes />
          </RequireUser>
        }
      />
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <RequireAuth>
            <EditProfile />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
