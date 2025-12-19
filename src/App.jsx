// src/App.jsx
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home";
import Veg from "./Veg";
import Nonveg from "./Nonveg";
import "./next.css";
import Locations from "./Locations";
import About from "./About";
import Drinks from "./Drinks";
import Cart from "./Cart";
import Order from "./Orders";
import Registration from "./RegistrationForm";
import Login from "./Login";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function App() {
  const cartItems = useSelector((state) => state.cart);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogout = () => {
    localStorage.clear();
    toast.info("Logged out successfully 🚪");
    window.location.href = "/login";
  };

  return (
    <BrowserRouter>
      <ToastContainer theme="colored" />

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
        <div className="container-fluid">

          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/home">
            <img
              src="https://e7.pngegg.com/pngimages/884/997/png-clipart-connemara-community-radio-j-f-schwarzlose-rausch-eau-de-parfum-perfume-radio-electronics-text-thumbnail.png"
              alt="logo"
              style={{ width: "55px", height: "55px", borderRadius: "50%" }}
            />
            <span className="fw-bold fs-4">
              PITHAPURAM MLA GARI RUCHULU
            </span>
          </Link>

          {/* Hamburger */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu */}
          <div className="collapse navbar-collapse" id="navbarMenu">
            <ul className="navbar-nav ms-auto gap-2">

              <li className="nav-item">
                <Link className="btn btn-outline-light" to="/home">Home</Link>
              </li>

              <li className="nav-item">
                <Link className="btn btn-outline-success" to="/Veg">Veg</Link>
              </li>

              <li className="nav-item">
                <Link className="btn btn-outline-danger" to="/Nonveg">Nonveg</Link>
              </li>

              <li className="nav-item">
                <Link className="btn btn-outline-info" to="/Drinks">Drinks</Link>
              </li>

              <li className="nav-item">
                <Link className="btn btn-outline-warning" to="/Locations">Locations</Link>
              </li>

              <li className="nav-item">
                <Link className="btn btn-outline-info" to="/About">About</Link>
              </li>

              <li className="nav-item">
                <Link className="btn btn-outline-info" to="/Cart">
                  Cart ({cartCount})
                </Link>
              </li>

              <li className="nav-item">
                <Link className="btn btn-outline-info" to="/Order">Order</Link>
              </li>

              {/* AUTH BUTTONS */}
              {!isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link className="btn btn-outline-info" to="/register">
                      📝 Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-outline-info" to="/login">
                      🔐 Login
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </button>
                </li>
              )}

            </ul>
          </div>
        </div>
      </nav>

      {/* ROUTES */}
      <main className="page-content">
        <Routes>
          <Route path="/"element={<Registration />} />
         <Route path="/register" element={<Registration />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Veg" element={<Veg />} />
          <Route path="/Nonveg" element={<Nonveg />} />
          <Route path="/Drinks" element={<Drinks />} />
          <Route path="/Locations" element={<Locations />} />
          <Route path="/About" element={<About />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Order" element={<Order />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
