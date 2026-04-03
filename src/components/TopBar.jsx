import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function TopBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate("/");
  };

  useEffect(() => {
    if (!menuRef.current) return;
    const handleClickOutside = (event) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const profileInitial = user?.name ? user.name.trim()[0].toUpperCase() : "U";
  const profilePhoto = user?.photo || "";

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
            <div className="topbar-profile-menu" ref={menuRef}>
              <button
                type="button"
                className="topbar-profile-btn"
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span className="topbar-profile-icon">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="Profile" />
                  ) : (
                    profileInitial
                  )}
                </span>
                <span className="topbar-profile-name">Profile</span>
              </button>
              {menuOpen && (
                <div className="topbar-profile-dropdown">
                  <Link to="/profile" onClick={() => setMenuOpen(false)}>
                    My Profile
                  </Link>
                  <Link to="/edit-profile" onClick={() => setMenuOpen(false)}>
                    Edit Profile
                  </Link>
                  <button type="button" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
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
