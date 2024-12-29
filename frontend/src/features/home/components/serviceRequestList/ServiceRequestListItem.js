import { Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { useTranslation } from "react-i18next";

const ServiceRequestListItem = ({ request, index, onDelete }) => {
  const { t } = useTranslation("common");

  const getStatusColor = (status) => {
    switch (status) {
      case "Invoiced":
        return "#C8E6C9";
      case "In Progress":
        return "#FFF9C4"; 
      case "Pending":
        return "#FFCDD2"; 
      case "Completed":
        return "#B3E5FC";
      default:
        return "#FFFFFF";
    }
  };

  return (
    <Card
      key={index}
      sx={{
        boxShadow: 3,
        borderRadius: 2,
        position: "relative",
        backgroundColor: getStatusColor(request.statusName),
      }}
    >
      <IconButton
        aria-label="delete"
        sx={{ position: "absolute", top: 8, right: 8 }}
        onClick={() => onDelete(request.id)}
      >
        <DeleteIcon />
      </IconButton>

      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {request.device.brand} {request.device.model}
        </Typography>
        <Typography variant="body1">
          <span style={{ fontWeight: "bold" }}>
            {t("ServiceRequest.IssueDescription")}:
          </span>{" "}
          {request.issueDescription}
        </Typography>
        <Typography variant="body1">
          <span style={{ fontWeight: "bold" }}>
            {t("ServiceRequest.RequestDate")}:
          </span>{" "}
          {new Date(request.requestDate).toLocaleDateString()}
        </Typography>
        <Typography variant="body1">
          <span style={{ fontWeight: "bold" }}>
            {t("ServiceRequest.Status")}:
          </span>{" "}
          {request.statusName}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ServiceRequestListItem;
