import axios from "axios";

const API_BASE_URL = "https://localhost:7170/api/Admin/";

export const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export const getUserList = async (username) => {
  const token = localStorage.getItem("token");
  try {
    const response = await instance.get(`users?username=${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDeviceList = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await instance.get("devices", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};
