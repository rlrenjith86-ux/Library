import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Smart Library Portal</h1>

          <p>
            Search books, access digital resources, and manage
            library borrowing requests in one place.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="primary-btn">
              Create Account
            </Link>

            <Link to="/login" className="secondary-btn">
              Login
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Library Services</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>📚 Books</h3>
            <p>Browse and search available library books.</p>
          </div>

          <div className="feature-card">
            <h3>📖 Resources</h3>
            <p>Access useful academic and digital resources.</p>
          </div>

          <div className="feature-card">
            <h3>📝 Borrow Requests</h3>
            <p>Request books and track request status.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;