import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const DeviceDialog = (props) => {
  const { device, open, handleClose, handleSave, isEdit } = props;
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const { t } = useTranslation("common");

  useEffect(() => {
    if (isEdit && device) {
      setType(device.deviceType);
      setBrand(device.brand);
      setModel(device.model);
      setSerialNumber(device.serialNumber);
    } else {
      setType("");
      setBrand("");
      setModel("");
      setSerialNumber("");
    }
  }, [isEdit, device]);

  const handleSaveClick = () => {
    const deviceData = { type, brand, model, serialNumber };
    handleSave(deviceData);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {isEdit
          ? t("Home.DeviceList.EditDevice")
          : t("Home.DeviceList.AddDevice")}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={t("Device.Type")}
          fullWidth
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <TextField
          margin="dense"
          label={t("Device.Brand")}
          fullWidth
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <TextField
          margin="dense"
          label={t("Device.Model")}
          fullWidth
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <TextField
          margin="dense"
          label={t("Device.SerialNumber")}
          fullWidth
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
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

export default DeviceDialog;
