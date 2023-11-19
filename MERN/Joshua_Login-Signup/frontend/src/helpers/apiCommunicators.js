import axios from "axios";

// Function to login a user
export const loginUser = async (username, password, userType) => {
  const response = await axios.post("/user/login", {
    username,
    password,
    userType,
  });
  if (response.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = response.data;
  return data;
};

// Function to sign up a user
export const signupUser = async (username, password, userType) => {
  const response = await axios.post("/user/signup", {
    username,
    password,
    userType,
  });
  if (response.status !== 201) {
    throw new Error("Unable to register account");
  }
  const data = response.data;
  return data;
};

// Function to check the auth status of a user
export const checkAuthStatus = async () => {
  const response = await axios.get("/user/auth-status");
  if (response.status !== 200) {
    throw new Error("Unable to check auth status");
  }
  const data = response.data;
  return data;
};

// Function to logout the user
export const logoutUser = async () => {
  const response = await axios.get("/user/logout");
  if (response.status !== 200) {
    throw new Error("Unable to logout");
  }
  const data = response.data;
  return data;
};
