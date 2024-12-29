import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { green, red } from "@mui/material/colors";

const ServiceRequestDialog = ({ open, handleClose, handleSave, devices }) => {
  const { t } = useTranslation("common");
  const [selectedDevice, setSelectedDevice] = useState("");
  const [issueDescription, setIssueDescription] = useState("");

  const handleSaveClick = () => {
    const requestData = {
      deviceId: selectedDevice,
      issueDescription,
    };
    handleSave(requestData);
    setSelectedDevice("");
    setIssueDescription("");
  };

  const handleDialogClose = () => {
    setSelectedDevice("");
    setIssueDescription("");
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} maxWidth="md" fullWidth>
      <DialogTitle>{t("Home.ServiceRequestList.AddRequest")}</DialogTitle>
      <DialogContent>
        <TextField
          select
          label={t("ServiceRequest.Device")}
          fullWidth
          value={selectedDevice}
          onChange={(e) => setSelectedDevice(e.target.value)}
          margin="dense"
        >
          {devices.map((device) => (
            <MenuItem key={device.id} value={device.id}>
              {device.brand} {device.model}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label={t("ServiceRequest.IssueDescription")}
          fullWidth
          value={issueDescription}
          onChange={(e) => setIssueDescription(e.target.value)}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleDialogClose}
          sx={{
            backgroundColor: red[500],
            color: "white",
            "&:hover": {
              backgroundColor: red[700],
            },
          }}
        >
          {t("Common.Cancel")}
        </Button>
        <Button
          onClick={handleSaveClick}
          sx={{
            backgroundColor: green[500],
            color: "white",
            "&:hover": {
              backgroundColor: green[700],
            },
          }}
        >
          {t("Common.Save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ServiceRequestDialog;
