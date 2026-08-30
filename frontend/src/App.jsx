import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

import Books from "./pages/Books.jsx";
import Books from "./pages/Books.jsx";
import BorrowRequests from "./pages/BorrowRequests.jsx";

function App() {
  return (
    <BrowserRouter>

      <div className="app-container">

        <Navbar />

        <main className="main-content">

          <Routes>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
<Route
  path="/books"
  element={
    <ProtectedRoute>
      <Books />
    </ProtectedRoute>
  }
/>
    <Route
  path="/books"
  element={
    <ProtectedRoute>
      <Books />
    </ProtectedRoute>
  }
/>

<Route
  path="/borrow-requests"
  element={
    <ProtectedRoute>
      <BorrowRequests />
    </ProtectedRoute>
  }
/> 
     </Routes>

        </main>

        <Footer />

      </div>

    </BrowserRouter>
  );
}

export default App;