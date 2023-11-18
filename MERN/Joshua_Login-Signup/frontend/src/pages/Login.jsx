import { Link, useNavigate } from "react-router-dom";
import Features from "../components/Features";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
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
      toast.error("Failed to log in", { id: "login" });
      console.log(error);
    }
  };
  return (
    <>
      <div className="form-container">
        <h2>Lab Management System</h2>
        {/* Form */}
        <form onSubmit={handleSubmitForm}>
          <div className="form-input">
            <input type="text" name="username" placeholder="Username" />
            <span>Incorrect credentials</span>
          </div>
          <div className="form-input">
            <input type="password" name="password" placeholder="Password" />
            <span>Incorrect credentials</span>
          </div>
          <div className="form-input">
            <select name="user-type" id="user-type">
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </select>
            <span>Incorrect credentials</span>
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
