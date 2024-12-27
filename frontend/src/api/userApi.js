import axios from "axios";

const API_BASE_URL = "https://localhost:7170/api/Users/";

export const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export const loginUser = async (username, password) => {
  try {
    const response = await instance.post("login", {
      Username: username,
      Password: password,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const response = await instance.post("register", {
      Username: username,
      Email: email,
      Password: password,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserRole = async (username) => {
  try {
    const response = await instance.get(`userRole?username=${username}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserInfo = async (username) => {
  try {
    const token = localStorage.getItem("token");
    const response = await instance.get(
      `userInfo?username=${username}`,
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
  try {
    const token = localStorage.getItem("token");
    const response = await instance.put(
      `userInfo?username=${username}`,
      {
        Username: data.username,
        Email: data.email,
        FirstName: data.firstName,
        LastName: data.lastName,
        PhoneNumber: data.phoneNumber,
        Address: data.address,
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
