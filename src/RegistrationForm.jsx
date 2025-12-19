// src/RegistrationForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";   // ✅ Added
import "./RegistrationForm.jsx";   // ❗ Corrected
import { registerUser } from "./Store.js";
import { useDispatch } from "react-redux";

function Registration() {
  const navigate = useNavigate();   // ✅ Added

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
  const result = await useDispatch(registerUser(data));
  if (registerUser.fulfilled.match(result)) {
    toast.success("Registration successful!");
    navigate("/login");
  } else {
    toast.error(result.payload || "Registration failed");
  }
};


  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: "500px" }}>
        
        <h2 className="text-center mb-4 text-primary">User Registration</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          
          {/* NAME */}
          <div className="mb-3">
            <label className="form-label fw-bold">Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Enter your name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <div className="invalid-feedback">Name is required</div>
            )}
          </div>

          {/* EMAIL */}
          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <div className="invalid-feedback">Email is required</div>
            )}
          </div>

          {/* PASSWORD */}
          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Enter password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <div className="invalid-feedback">Password is required</div>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button type="submit" className="btn btn-primary w-100 py-2">
            Register
          </button>

        </form>

     <button
  className="btn w-100 mt-3 py-2 text-white"
  style={{
    background: "linear-gradient(45deg, #4b6cb7, #182848)",
    borderRadius: "8px",
    fontWeight: "600",
    letterSpacing: "0.5px",
  }}
  onClick={() => navigate("/login")}
>
  Login
</button>

      </div>
    </div>
  );
}

export default Registration;
