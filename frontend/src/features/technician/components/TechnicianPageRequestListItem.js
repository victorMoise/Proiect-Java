import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import React from "react";
import { useTranslation } from "react-i18next";

const TechnicianPageRequestListItem = (props) => {
  const {
    request,
    index,
    onStartProgress,
    onStopProgress,
    onComplete,
    onLogWork,
    onCreateInvoice,
    onRevokeInvoice
  } = props;
  const { t } = useTranslation("common");

  return (
    <Card
      key={index}
      sx={{ boxShadow: 3, borderRadius: 2, position: "relative" }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {request.device.brand} {request.device.model}
        </Typography>
        <Typography variant="body1">
          <span style={{ fontWeight: "bold" }}>{t("Device.Type")}: </span>{" "}
          {request.device.deviceType}
        </Typography>
        <Typography variant="body1">
          <span style={{ fontWeight: "bold" }}>
            {t("Device.SerialNumber")}:{" "}
          </span>{" "}
          {request.device.serialNumber}
        </Typography>
        <Typography variant="body1">
          <span style={{ fontWeight: "bold" }}>
            {t("ServiceRequest.IssueDescription")}:{" "}
          </span>{" "}
          {request.issueDescription}
        </Typography>
        <Typography variant="body1">
          <span style={{ fontWeight: "bold" }}>{t("Device.Client")}: </span>{" "}
          {request.clientName}
        </Typography>
        <Typography variant="body1">
          <span style={{ fontWeight: "bold" }}>
            {t("ServiceRequest.RequestDate")}:{" "}
          </span>{" "}
          {new Date(request.requestDate).toLocaleDateString()}
        </Typography>
        <Typography variant="body1">
          <span style={{ fontWeight: "bold" }}>
            {t("ServiceRequest.Status")}:{" "}
          </span>{" "}
          {request.statusName}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          {request.statusName === "Pending" && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => onStartProgress(request.serviceRequestId)}
              sx={{ ml: 1 }}
            >
              {t("Technician.Request.Button.Start")}
            </Button>
          )}
          {request.statusName === "In Progress" && (
            <>
              <Button
                variant="contained"
                size="small"
                onClick={() => onLogWork(request.serviceRequestId)}
                sx={{ ml: 1 }}
              >
                {t("Technician.Request.Button.LogWork")}
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => onComplete(request.serviceRequestId)}
                sx={{
                  ml: 1,
                  backgroundColor: green[500],
                  color: "white",
                  "&:hover": {
                    backgroundColor: green[700],
                  },
                }}
              >
                {t("Technician.Request.Button.Complete")}
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={() => onStopProgress(request.serviceRequestId)}
                sx={{
                  ml: 1,
                  backgroundColor: red[500],
                  color: "white",
                  "&:hover": {
                    backgroundColor: red[700],
                  },
                }}
              >
                {t("Technician.Request.Button.Stop")}
              </Button>
            </>
          )}
          {request.statusName === "Completed" && (
            <>
              <Button
                variant="contained"
                size="small"
                onClick={() => onStartProgress(request.serviceRequestId)}
                sx={{ ml: 1 }}
              >
                {t("Technician.Request.Button.Reopen")}
              </Button>
              <Button
                variant="contained"
                size="small"
                sx={{
                  ml: 1,
                  backgroundColor: green[500],
                  color: "white",
                  "&:hover": {
                    backgroundColor: green[700],
                  },
                }}
                onClick={() => onCreateInvoice(request.serviceRequestId)}
              >
                {t("Technician.Request.Button.Invoice")}
              </Button>
            </>
          )}
          {request.statusName === "Invoiced" && (
            <>
              <Button
                variant="contained"
                size="small"
                onClick={() => onRevokeInvoice(request.serviceRequestId)}
                sx={{ ml: 1 }}
              >
                {t("Technician.Request.Button.UnInvoice")}
              </Button>
              <Button variant="contained" size="small" disabled sx={{ ml: 1 }}>
                {t("Technician.Request.Button.Invoiced")}
              </Button>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TechnicianPageRequestListItem;
