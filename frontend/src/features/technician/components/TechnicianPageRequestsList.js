import React, { useEffect, useState } from "react";
import {
  getAllServiceRequests,
  updateRequestStatus,
} from "../../../api/serviceRequestApi";
import { useTranslation } from "react-i18next";
import useToast from "../../../hooks/useToast";
import Toast from "../../../components/Toast";
import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import TechnicianPageRequestListItem from "./TechnicianPageRequestListItem";
import LogWorkDialog from "./LogWorkDialog";
import {
  createInvoice,
  deleteInvoicesOfServiceRequest,
} from "../../../api/invoiceApi";
import { logWork } from "../../../api/serviceLogApi";

const TechnicianPageRequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [openLogWorkDialog, setOpenLogWorkDialog] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const [currentDeviceName, setCurrentDeviceName] = useState("");
  const [currentSerialNumber, setCurrentSerialNumber] = useState("");
  const [selectedServiceType, setSelectedServiceType] = useState(-1);
  const [notes, setNotes] = useState("");
  const { toast, showToast, handleClose } = useToast();
  const { t } = useTranslation("common");

  const handleStartProgress = async (requestId) => {
    await updateRequestStatus(requestId, 2);
    handleGetRequests();
  };

  const handleComplete = async (requestId) => {
    await updateRequestStatus(requestId, 3);
    handleGetRequests();
  };

  const handleStopProgress = async (requestId) => {
    await updateRequestStatus(requestId, 1);
    handleGetRequests();
  };

  const handleLogWork = (requestId, deviceName, serialNumber) => {
    setCurrentRequestId(requestId);
    setCurrentDeviceName(deviceName);
    setCurrentSerialNumber(serialNumber);
    setOpenLogWorkDialog(true);
  };

  const handleCreateInvoice = async (requestId) => {
    try {
      await createInvoice(requestId);
      await updateRequestStatus(requestId, 5);
      showToast(t("Technician.Request.CreateInvoiceSuccess"), "success");
      handleGetRequests();
    } catch (error) {
      showToast(t(error.response.data.message), "error");
    }
  };

  const handleRevokeInvoice = async (requestId) => {
    try {
      await updateRequestStatus(requestId, 3);
      await deleteInvoicesOfServiceRequest(requestId);
      showToast(t("Technician.Request.RevokeInvoiceSuccess"), "success");
      handleGetRequests();
    } catch (error) {
      showToast(t(error.response.data.message), "error");
    }
  };

  const handleCloseLogWorkDialog = () => {
    setOpenLogWorkDialog(false);
    setCurrentRequestId(null);
    setCurrentDeviceName("");
    setCurrentSerialNumber("");
    setSelectedServiceType(-1);
    setNotes("");
  };

  const handleSaveLogWork = async () => {
    try {
      await logWork(currentRequestId, selectedServiceType, notes);
      showToast(t("Technician.Request.LogWorkSuccess"), "success");
      handleGetRequests();
    } catch (error) {
      showToast(t(error.response.data.message), "error");
    }
    handleCloseLogWorkDialog();
  };

  const handleGetRequests = async () => {
    try {
      const response = await getAllServiceRequests();
      setRequests(response);
    } catch (error) {
      showToast(t(error.response.data.message), "error");
    }
  };

  useEffect(() => {
    handleGetRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardActions = [
    <IconButton key="refresh" onClick={handleGetRequests}>
      <RefreshIcon />
    </IconButton>,
  ];

  return (
    <>
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
              {t("Technician.Request.Title")}
            </Typography>
            {cardActions && <div>{cardActions}</div>}
          </div>
          <Grid container spacing={3}>
            {requests.map((request, index) => (
              <Grid item xs={12} sm={12} md={12} lg={6} xl={4} key={index}>
                <TechnicianPageRequestListItem
                  request={request}
                  onStartProgress={handleStartProgress}
                  onComplete={handleComplete}
                  onStopProgress={handleStopProgress}
                  onCreateInvoice={handleCreateInvoice}
                  onRevokeInvoice={handleRevokeInvoice}
                  onLogWork={() =>
                    handleLogWork(
                      request.id,
                      request.device.brand + " " + request.device.model,
                      request.device.serialNumber
                    )
                  }
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      <LogWorkDialog
        open={openLogWorkDialog}
        onClose={handleCloseLogWorkDialog}
        onSave={handleSaveLogWork}
        deviceName={currentDeviceName}
        serialNumber={currentSerialNumber}
        selectedServiceType={selectedServiceType}
        setSelectedServiceType={setSelectedServiceType}
        notes={notes}
        setNotes={setNotes}
      />
      <Toast toast={toast} handleClose={handleClose} />
    </>
  );
};

export default TechnicianPageRequestsList;
