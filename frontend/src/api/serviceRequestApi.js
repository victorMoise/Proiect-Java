import axios from "axios";

const API_BASE_URL = "http://localhost:8080/service-request";

export const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export const getUsersServiceRequests = async () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  try {
    const response = await instance.get(`/list?username=${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addServiceRequest = async (serviceRequest) => {
  try {
    const token = localStorage.getItem("token");
    const response = await instance.post(
      "",
      {
        deviceId: serviceRequest.deviceId,
        issueDescription: serviceRequest.issueDescription,
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

export const deleteServiceRequest = async (serviceRequestId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await instance.delete(`/${serviceRequestId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllServiceRequests = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await instance.get(`/list?username=${""}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRequestStatus = async (serviceRequestId, statusId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await instance.put(
      `status?serviceRequestId=${serviceRequestId}&statusId=${statusId}`,
      {},
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
