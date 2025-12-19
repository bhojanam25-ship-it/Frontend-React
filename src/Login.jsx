import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginUser } from "./Store.js";
import { ToastContainer, toast } from "react-toastify";
import "./Login.jsx";
import "./App.jsx";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.Login);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ---------------- LOGIN ----------------
  const submitLogin = (data) => {
   dispatch(LoginUser(data))
  .unwrap()
  .then((res) => {
    toast.success("Login Successful 🔐");

    // 🔐 wait for token
    if (res?.token) {
      navigate("/Home");
    }
  })
  .catch(() => {
    toast.error("Invalid Email or Password");
  });

  };

  // ---------------- LOGOUT ----------------
  const handleLogout = () => {
    toast.info("Logged out successfully 🚪");

    localStorage.clear();
    sessionStorage.clear();

    navigate("/");
    window.location.reload();
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">

      {/* LOGIN CARD */}
      <div className="card shadow-lg p-4" style={{ width: "380px" }}>
        <h2 className="text-center mb-4 text-success fw-bold">
          Login to Janasena Restaurant
        </h2>

        <form onSubmit={handleSubmit(submitLogin)}>

          {/* EMAIL */}
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
            <label>Email address</label>
            {errors.email && (
              <div className="text-danger small mt-1">
                {errors.email.message}
              </div>
            )}
          </div>

          {/* PASSWORD */}
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              {...register("password", { required: "Password required" })}
            />
            <label>Password</label>
            {errors.password && (
              <div className="text-danger small mt-1">
                {errors.password.message}
              </div>
            )}
          </div>

          {/* LOGIN BUTTON */}
          <button
            className="btn btn-success w-100 mb-2 fw-semibold"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          {/* LOGOUT BUTTON (BOOTSTRAP STYLED) */}
          {user && (
            <button
              type="button"
              className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right"></i>
              Logout
            </button>
          )}

          {/* ERROR MESSAGE */}
          {error && (
            <p className="text-danger text-center mt-2 fw-semibold">
              {error}
            </p>
          )}

          {/* USER MESSAGE */}
          {user && (
            <p className="text-success text-center mt-3 fw-bold">
              Welcome, {user.username}
            </p>
          )}
        </form>
      </div>

      {/* FOOTER */}
      <div className="text-center mt-4">
        <h6 className="fw-bold">About Janasena Restaurant</h6>
        <p className="text-muted mb-1">
          Fresh groceries delivered to your home.
        </p>
        <p className="text-muted small mb-0">
          © 2025 Janasena Restaurant. All rights reserved.
        </p>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Login;
