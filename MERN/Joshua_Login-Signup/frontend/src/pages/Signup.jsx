import { Link, useNavigate } from "react-router-dom";
import Features from "../components/Features";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useState } from "react";

const Signup = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  // Function to handle submit
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    const userType = formData.get("user-type");
    try {
      toast.loading("Creating account...", { id: "signup" });
      await auth?.signup(username, password, userType);
      toast.success("Successfully created account", { id: "signup" });
      navigate("/");
    } catch (error) {
      toast.error("Failed to create account", { id: "signup" });
      setError(error.response.data);
      setTimeout(() => {
        setError("");
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
            <span>{error && error}</span>
          </div>
          <div className="form-input">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              minLength={6}
            />
          </div>
          <div className="form-input">
            <select name="user-type" id="user-type" required>
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </select>
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>
      <Features />
      <div className="call-to-action">
        <Link to="/">Get Started</Link>
      </div>
    </>
  );
};
export default Signup;
