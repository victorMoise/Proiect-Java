import axios from "axios";

const API_BASE_URL = "http://localhost:8080/user/";

export const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export const loginUser = async (username, password) => {
  try {
    const response = await instance.post("login", {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (username, email, password, confirmPassword) => {
  try {
    const response = await instance.post("register", {
      username,
      email,
      password,
      confirmPassword
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserRole = async (username) => {
  try {
    const response = await instance.get(`role?username=${username}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserInfo = async (username) => {
  try {
    const token = localStorage.getItem("token");
    const response = await instance.get(
      `info?username=${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserInfo = async (username, data) => {
  const storedUsername = localStorage.getItem("username");
  try {
    const token = localStorage.getItem("token");
    const response = await instance.put(
      `info?username=${storedUsername}`,
      {
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        address: data.address,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
