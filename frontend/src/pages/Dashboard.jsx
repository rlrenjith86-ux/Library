import { Link } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  return (
    <div className="page-container">

      <div className="dashboard-header">

        <h1>
          Welcome, {user.name}
        </h1>

        <p>
          {user.role === "teacher"
            ? "Teacher Dashboard"
            : "Student Dashboard"}
        </p>

      </div>

      <div className="dashboard-grid">

        <div className="dashboard-card">

          <h2>📚 Books</h2>

          <p>
            Browse available books and
            submit borrowing requests.
          </p>

          <Link
            to="/books"
            className="primary-btn"
          >
            Browse Books
          </Link>

        </div>

        <div className="dashboard-card">

          <h2>📖 Resources</h2>

          <p>
            Access academic and digital
            library resources.
          </p>

          <Link
            to="/resources"
            className="primary-btn"
          >
            View Resources
          </Link>

        </div>

        <div className="dashboard-card">

          <h2>📝 My Requests</h2>

          <p>
            Check the status of your
            borrowing requests.
          </p>

          <Link
            to="/borrow-requests"
            className="primary-btn"
          >
            View Requests
          </Link>

        </div>

        <div className="dashboard-card">

          <h2>👤 Profile</h2>

          <p>
            View your account and
            academic details.
          </p>

          <Link
            to="/profile"
            className="primary-btn"
          >
            My Profile
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;