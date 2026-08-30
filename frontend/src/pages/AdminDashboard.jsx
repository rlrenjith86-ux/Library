import { Link } from "react-router-dom";

function AdminDashboard() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  return (
    <div className="page-container">

      <div className="dashboard-header">

        <h1>
          Admin Dashboard
        </h1>

        <p>
          Welcome, {user.name}
        </p>

      </div>

      <div className="dashboard-grid">

        <div className="dashboard-card">

          <h2>📚 Manage Books</h2>

          <p>
            Add, edit, and manage
            library books.
          </p>

          <Link
            to="/books"
            className="primary-btn"
          >
            Manage Books
          </Link>

        </div>

        <div className="dashboard-card">

          <h2>📝 Borrow Requests</h2>

          <p>
            Review borrowing requests
            from students and teachers.
          </p>

          <Link
            to="/borrow-requests"
            className="primary-btn"
          >
            Manage Requests
          </Link>

        </div>

        <div className="dashboard-card">

          <h2>📖 Resources</h2>

          <p>
            Manage academic and digital
            library resources.
          </p>

          <Link
            to="/resources"
            className="primary-btn"
          >
            Manage Resources
          </Link>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;