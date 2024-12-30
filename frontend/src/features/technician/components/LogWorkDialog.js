import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { getServiceTypes } from "../../../api/serviceLogApi";
import { green, red } from "@mui/material/colors";

const LogWorkDialog = ({
  open,
  onClose,
  onSave,
  deviceName,
  serialNumber,
  selectedServiceType,
  setSelectedServiceType,
  notes, 
  setNotes
}) => {
  const { t } = useTranslation("common");
  const [serviceTypes, setServiceTypes] = useState([]);

  useEffect(() => {
    const fetchServiceTypes = async () => {
      try {
        const types = await getServiceTypes();
        setServiceTypes(types);
      } catch (error) {
        console.error("", error);
      }
    };

    if (open) {
      fetchServiceTypes();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("Technician.Request.LogWork")}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label={t("Device.Name")}
          value={deviceName}
          disabled
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label={t("Device.SerialNumber")}
          value={serialNumber}
          disabled
          sx={{ mt: 2 }}
        />
        <TextField
          select
          label={t("Technician.Request.ServiceType")}
          fullWidth
          value={selectedServiceType}
          onChange={(e) => setSelectedServiceType(e.target.value)}
          margin="dense"
          required
        >
          {serviceTypes.map((type) => (
            <MenuItem key={type.id} value={type.id}>
              {type.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          multiline
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder={t("Technician.Request.Notes")}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
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
          onClick={onSave}
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

export default LogWorkDialog;
