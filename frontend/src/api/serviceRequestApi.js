import axios from "axios";

const API_BASE_URL = "https://localhost:7170/api/ServiceRequests/";

export const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export const getUsersServiceRequests = async () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  try {
    const response = await instance.get(
      `serviceRequests?username=${username}`,
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

export const addServiceRequest = async (serviceRequest) => {
  try {
    const token = localStorage.getItem("token");
    const response = await instance.post(
      "serviceRequest",
      {
        DeviceId: serviceRequest.deviceId,
        IssueDescription: serviceRequest.issueDescription,
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
    const response = await instance.delete(
      `serviceRequest?serviceRequestId=${serviceRequestId}`,
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

export const getAllServiceRequests = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await instance.get("allServiceRequests", {
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
      `serviceRequestStatus?serviceRequestId=${serviceRequestId}&statusId=${statusId}`,
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

export const getServiceTypes = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await instance.get("serviceTypes", {
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
    const response = await instance.put(
      `logWork`,
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


export const getUsersWork = async () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  try {
    const response = await instance.get(
      `UsersServiceLogs?username=${username}`,
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

export const deleteWork = async (serviceLogId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await instance.delete(
      `serviceLog?serviceLogId=${serviceLogId}`,
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