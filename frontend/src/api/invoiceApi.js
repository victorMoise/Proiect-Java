import axios from "axios";

const API_BASE_URL = "https://localhost:7170/api/Invoices/";

export const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export const createInvoice = async (requestId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await instance.post(
      `invoice?serviceRequestId=${requestId}`,
      null,
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

export const getUsersInvoices = async () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("username");

  try {
    const response = await instance.get(`list?username=${user}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteInvoicesOfServiceRequest = async (serviceRequestId) => {
  const token = localStorage.getItem("token");
  try {
    await instance.delete(
      `invoices-device-serviceRequest?serviceRequestId=${serviceRequestId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

export const invoiceServiceLogs = async (invoiceId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await instance.get(
      `invoice-service-logs?invoiceId=${invoiceId}`,
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

export const updateInvoiceStatus = async (invoiceId, status) => {
  const token = localStorage.getItem("token");
  try {
    await instance.put(
      `update-invoice-status?invoiceId=${invoiceId}&paymentStatusId=${status}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
}
