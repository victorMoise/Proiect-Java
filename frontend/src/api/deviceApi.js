import axios from "axios";

const API_BASE_URL = "https://localhost:7170/api/Devices/";

export const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export const addDevice = async (device) => {
  try {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const response = await instance.post(
      "add",
      {
        ClientName: username,
        DeviceType: device.type,
        Brand: device.brand,
        Model: device.model,
        SerialNumber: device.serialNumber
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

export const getUsersDevices = async () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  try {
    const response = await instance.get(`deviceList?username=${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const deleteDevice = async (deviceId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await instance.delete(`deleteDevice?deviceId=${deviceId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const updateDevice = async (deviceId, device) => {
  try {
    const token = localStorage.getItem("token");
    const response = await instance.put(
      `updateDevice?deviceId=${deviceId}`,
      {
        DeviceType: device.type,
        Brand: device.brand,
        Model: device.model,
        SerialNumber: device.serialNumber
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
}