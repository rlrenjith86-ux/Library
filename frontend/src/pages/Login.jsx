import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";

function Login() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await api.post(
        "/auth-login",
        {
          identifier,
          password
        }
      );

      const {
        token,
        user,
        message: responseMessage
      } = response.data;

      localStorage.setItem(
        "token",
        token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      setMessage(
        responseMessage ||
        "Login successful"
      );

      setTimeout(() => {
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }, 500);

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Login failed. Please check your details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <form
        className="auth-card"
        onSubmit={handleLogin}
      >

        <h2>Login</h2>

        <p>
          Login to your Smart Library account
        </p>

        {message && (
          <div className="info-message">
            {message}
          </div>
        )}

        <label>
          Register Number / ID Number / Phone
        </label>

        <input
          type="text"
          value={identifier}
          onChange={(event) =>
            setIdentifier(event.target.value)
          }
          required
        />

        <label>Password</label>

        <input
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          required
        />

        <button
          type="submit"
          className="primary-btn full-btn"
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        <p className="auth-footer">
          Don't have an account?{" "}

          <Link to="/register">
            Register
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Login;