import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Header = () => {
  const auth = useAuth();
  // Function to handle click logout
  const handleClickLogout = async () => {
    try {
      toast.loading("Logging out...", { id: "logout" });
      await auth?.logout();
      toast.success("Successfully logged out", { id: "logout" });
    } catch (error) {
      toast.error("Failed to logout", { id: "logout" });
      console.log(error);
    }
  };
  return (
    <div className="header">
      <h1>Dr. Vita&nbsp;s System</h1>
      <p>Empowering Laboratories with Cutting-edge Technology</p>
      <div className="links">
        {auth?.user && auth?.isLoggedIn ? (
          <Link className="link-item" to="/login" onClick={handleClickLogout}>
            Logout
          </Link>
        ) : (
          <>
            <Link className="login-link" to="/login">
              Login
            </Link>
            <Link className="signup-link" to="/signup">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
export default Header;
