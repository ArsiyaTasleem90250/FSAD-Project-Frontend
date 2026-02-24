import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>SMS</h2>

      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/report">Report</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </div>
  );
}

export default Sidebar;