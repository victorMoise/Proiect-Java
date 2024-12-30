import axios from "axios";

const API_BASE_URL = "http://localhost:8080/service-log";

export const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export const getServiceTypes = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await instance.get("types", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logWork = async (serviceRequestId, serviceTypeId, notes) => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  try {
    const response = await instance.post(
      ``,
      {
        username,
        serviceRequestId,
        serviceTypeId,
        notes,
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

