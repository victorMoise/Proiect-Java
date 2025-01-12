import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  addServiceRequest,
  deleteServiceRequest,
  getUsersServiceRequests,
} from "../../../../api/serviceRequestApi";
import { useTranslation } from "react-i18next";
import useToast from "../../../../hooks/useToast";
import ServiceRequestListItem from "./ServiceRequestListItem";
import ServiceRequestDialog from "./ServiceRequestDialog";
import Toast from "../../../../components/Toast";
import { getUsersDevices } from "../../../../api/deviceApi";

const ServiceRequestListContainer = () => {
  const { t } = useTranslation("common");
  const [requestList, setRequestList] = useState([]);
  const { toast, showToast, handleClose: handleCloseToast } = useToast();
  const [open, setOpen] = useState(false);
  const [devices, setDevices] = useState([]);

  const handleGetServiceRequestList = async () => {
    try {
      const response = await getUsersServiceRequests();
      setRequestList(response);
    } catch (error) {
      console.error("Error getting devices", error);
    }
  };

  const handleOpen = async () => {
    await fetchDevices();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchDevices = async () => {
    try {
      const response = await getUsersDevices();
      setDevices(response);
    } catch (error) {
      console.error("Error fetching devices", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteServiceRequest(id);
      showToast(t("Home.ServiceRequestList.DeletedSuccessfully"), "success");
      handleGetServiceRequestList();
    } catch (error) {
      showToast(
        t(error.response.data.message) ||
          t("Home.ServiceRequestList.Error.ErrorDeletingRequest"),
        "error"
      );
    }
  };

  const handleSave = async (requestData) => {
    try {
      await addServiceRequest(requestData);
      showToast(t("Home.ServiceRequestList.SavedSuccessfully"), "success");
      handleGetServiceRequestList();
    } catch (error) {
      showToast(t(error.response.data.message), "error");
    }
    setOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleGetServiceRequestList();
    }, 10);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardActions = [
    <IconButton key="add" onClick={() => handleOpen()}>
      <AddIcon />
    </IconButton>,
    <IconButton key="refresh" onClick={handleGetServiceRequestList}>
      <RefreshIcon />
    </IconButton>,
  ];

  return (
    <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, marginBottom: 2 }}>
      <CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Typography variant="h5">
            {t("Home.ServiceRequestList.Title")}
          </Typography>
          {cardActions && <div>{cardActions}</div>}
        </div>
        <Grid container spacing={3}>
          {requestList?.map((request, index) => (
            <Grid item xs={12} sm={12} md={12} lg={6} xl={4} key={index}>
              <ServiceRequestListItem
                key={index}
                request={request}
                onDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>

        <ServiceRequestDialog
          open={open}
          handleClose={handleClose}
          handleSave={handleSave}
          devices={devices}
        />
        <Toast toast={toast} handleClose={handleCloseToast} />
      </CardContent>
    </Card>
  );
};

export default ServiceRequestListContainer;
