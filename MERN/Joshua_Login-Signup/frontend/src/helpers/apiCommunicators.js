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
  const data = await response.data;
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
    throw new Error("Unable to create account");
  }
  const data = await response.data;
  return data;
};

// Function to check the auth status of a user
export const checkAuthStatus = async () => {
  const response = await axios.get("/user/auth-status");
  if (response.status !== 200) {
    throw new Error("Unable to authenticate user");
  }
  const data = await response.data;
  return data;
};

// Function to logout the user
export const logoutUser = async () => {
  const response = await axios.get("/user/logout");
  if (response.status !== 200) {
    throw new Error("Unable to logout user");
  }
  const data = await response.data;
  return data;
};
