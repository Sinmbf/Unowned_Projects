import axios from "axios";

// Function to login a user
export const loginUser = async (email, password, userType) => {
  const response = await axios.post("/login", { email, password, userType });
  if (response.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = response.data;
  return data;
};

// Function to sign up a user
export const signupUser = async (email, password, userType) => {
  const response = await axios.post("/signup", { email, password, userType });
  if (response.status !== 201) {
    throw new Error("Unable to register account");
  }
  const data = response.data;
  return data;
};
