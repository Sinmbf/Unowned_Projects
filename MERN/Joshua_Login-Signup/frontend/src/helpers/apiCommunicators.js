import axios from "axios";

// Function to login a user
export const loginUser = async (username, password, userType) => {
  try {
    const response = await axios.post("/user/login", {
      username,
      password,
      userType,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Function to sign up a user
export const signupUser = async (username, password, userType) => {
  try {
    const response = await axios.post("/user/signup", {
      username,
      password,
      userType,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Function to check the auth status of a user
export const checkAuthStatus = async () => {
  try {
    const response = await axios.get("/user/auth-status");
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Function to logout the user
export const logoutUser = async () => {
  try {
    const response = await axios.get("/user/logout");
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
