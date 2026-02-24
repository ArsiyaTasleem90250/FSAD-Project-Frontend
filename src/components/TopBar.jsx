import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function TopBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="topbar">
      <Link to="/" className="topbar-brand">Student Monitoring System</Link>
      <nav className="topbar-nav">
        {user ? (
          <>
            {user.role === "Student" && (
              <>
                <Link to="/courses">Courses</Link>
                <Link to="/add-submission">Add submission</Link>
                <Link to="/my-outcomes">My learning outcomes</Link>
              </>
            )}
            {user.role === "Admin" && (
              <>
                <Link to="/courses">Courses</Link>
                <Link to="/marking">Marking</Link>
                <Link to="/learning-outcomes">Learning outcomes</Link>
              </>
            )}
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/report">Report</Link>
            <button type="button" className="topbar-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/report">Report</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default TopBar;
