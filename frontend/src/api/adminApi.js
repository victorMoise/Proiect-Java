import axios from "axios";

const API_BASE_URL = "http://localhost:8080/admin";

export const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export const getUserList = async (username) => {
  const token = localStorage.getItem("token");
  try {
    const response = await instance.get(`/user/list?username=${username}`, {
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

export const getUserRoles = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await instance.get("/user/role", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserRole = async (username, roleId) => {
  const token = localStorage.getItem("token");
  try {
    await instance.put(`/user/role`, null, {
      params: {
        username: username,
        role: roleId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};