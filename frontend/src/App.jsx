import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

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
          </Routes>
        </main>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;