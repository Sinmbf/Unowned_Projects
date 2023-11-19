/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom";
import Features from "../components/Features";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [error, setError] = useState({});
  useEffect(() => {
    if (auth?.user && auth?.isLoggedIn) {
      toast.success("You are already logged in", { id: "already" });
      return navigate("/");
    }
  }, [auth]);

  // Function to determine type of error
  const determineErrorType = (error) => {
    const splitError = error.split(" ");
    if (splitError.includes("Account")) {
      return "username";
    } else if (splitError.includes("credentials")) {
      return "password";
    } else {
      return "user-type";
    }
  };

  // Function to handle submit
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    const userType = formData.get("user-type");
    try {
      toast.loading("Logging in...", { id: "login" });
      await auth?.login(username, password, userType);
      toast.success("Successfully logged in", { id: "login" });
      navigate("/");
    } catch (error) {
      toast.error("Failed to login", { id: "login" });
      const errorType = determineErrorType(error.response.data);
      setError({ error: error.response.data, type: errorType });
      setTimeout(() => {
        setError({});
      }, 2500);
    }
  };
  return (
    <>
      <div className="form-container">
        <h2>Lab Management System</h2>
        {/* Form */}
        <form onSubmit={handleSubmitForm}>
          <div className="form-input">
            <input
              type="email"
              name="username"
              placeholder="Username"
              required
            />
            <span>{error?.type === "username" && error.error}</span>
          </div>
          <div className="form-input">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              minLength={6}
            />
            <span>{error?.type === "password" && error.error}</span>
          </div>
          <div className="form-input">
            <select name="user-type" id="user-type" required>
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </select>
            <span>{error?.type === "user-type" && error.error}</span>
          </div>

          <button type="submit">Login</button>
        </form>
        <div className="forgot-password">
          <a href="#">Forgot Password</a>
        </div>
        <button type="button" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </div>
      <Features />
      <div className="call-to-action">
        <Link to="/">Get Started</Link>
      </div>
    </>
  );
};

export default Login;
