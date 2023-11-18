/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  useEffect(() => {
    if (!auth?.username && !auth?.isLoggedIn) {
      toast.error("Please login or register to access our features");
      return navigate("/login");
    }
  }, [auth]);
  return <h1>Home</h1>;
};
export default Home;
