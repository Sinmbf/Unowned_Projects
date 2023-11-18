import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Form = () => {
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
    } catch (error) {
      toast.error("Failed to log in", { id: "login" });
      console.log(error);
    }
  };
  return (
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

      <input type="submit" defaultValue="Login" />
    </form>
  );
};
export default Form;
