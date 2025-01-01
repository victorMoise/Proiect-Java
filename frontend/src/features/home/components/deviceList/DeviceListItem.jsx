import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { red, green } from "@mui/material/colors";

const DeviceListItem = ({ device, onEdit, onDelete }) => {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    onDelete(device.id);
    handleClose();
  };

  return (
    <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, marginBottom: 2 }}>
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="h6">
              {device.brand} {device.model}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="edit"
              sx={{ color: "orange" }}
              onClick={onEdit}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              sx={{ color: "red" }}
              onClick={handleClickOpen}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="body1">
          <span style={{ fontWeight: "bold" }}>{t("Device.Type")}:</span>{" "}
          {device.deviceType}
        </Typography>
        <Typography variant="body1">
          <span style={{ fontWeight: "bold" }}>
            {t("Device.SerialNumber")}:
          </span>{" "}
          {device.serialNumber}
        </Typography>
      </CardContent>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t("Common.ConfirmDelete")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("Common.ConfirmDeleteMessage")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            size="small"
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
            onClick={handleDelete}
            variant="contained"
            size="small"
            sx={{
              backgroundColor: green[500],
              color: "white",
              "&:hover": {
                backgroundColor: green[700],
              },
            }}
            autoFocus
          >
            {t("Common.Delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default DeviceListItem;
