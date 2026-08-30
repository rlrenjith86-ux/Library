import {
  Link,
  useNavigate
} from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token =
    localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="navbar-container">

        <Link
          to="/"
          className="brand"
        >
          📚 Smart Library Portal
        </Link>

        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          {!token && (
            <>
              <Link to="/register">
                Register
              </Link>

              <Link to="/login">
                Login
              </Link>
            </>
          )}

          {token && (
            <>
              {user?.role === "admin" ? (

                <>
                  <Link to="/admin">
                    Dashboard
                  </Link>

                  <Link to="/books">
                    Books
                  </Link>

                  <Link to="/resources">
                    Resources
                  </Link>

                  <Link to="/borrow-requests">
                    Requests
                  </Link>
                </>

              ) : (

                <>
                  <Link to="/dashboard">
                    Dashboard
                  </Link>

                  <Link to="/books">
                    Books
                  </Link>

                  <Link to="/resources">
                    Resources
                  </Link>

                  <Link to="/borrow-requests">
                    My Requests
                  </Link>

                  <Link to="/profile">
                    Profile
                  </Link>
                </>

              )}

              <button
                type="button"
                className="logout-button"
                onClick={logout}
              >
                Logout
              </button>

            </>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;