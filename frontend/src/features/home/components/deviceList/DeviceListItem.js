import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, Typography, IconButton, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const DeviceListItem = ({ device, index, onDelete, onEdit }) => {
  const { t } = useTranslation("common");

  return (
    <Card
      key={index}
      sx={{ boxShadow: 3, borderRadius: 2, position: "relative" }}
    >
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
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
              onClick={() => onDelete(device.id)}
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
    </Card>
  );
};

export default DeviceListItem;
