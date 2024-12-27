import React, { useState } from "react";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useTranslation } from "react-i18next";
import InvoiceDetailsModal from "./InvoiceDetailsModal";

const InvoiceListItem = ({ invoice, index, onPay }) => {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "Complete":
        return "#C8E6C9";
      case "Pending":
        return "#FFCDD2";
      default:
        return "#FFFFFF";
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card
        key={index}
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          position: "relative",
          backgroundColor: getStatusColor(invoice.paymentStatus),
        }}
      >
        <IconButton
          aria-label="view"
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={handleClickOpen}
        >
          <VisibilityIcon />
        </IconButton>

        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {invoice.brand} {invoice.model}
          </Typography>
          <Typography variant="body1">
            <span style={{ fontWeight: "bold" }}>
              {t("Device.SerialNumber")}:
            </span>{" "}
            {invoice.serialNumber}
          </Typography>
          <Typography variant="body1">
            <span style={{ fontWeight: "bold" }}>
              {t("ServiceRequest.IssueDescription")}:
            </span>{" "}
            {invoice.issueDescription}
          </Typography>
          <Typography variant="body1">
            <span style={{ fontWeight: "bold" }}>
              {t("ServiceRequest.PaymentStatus")}:
            </span>{" "}
            {invoice.paymentStatus}
          </Typography>
          <Typography variant="body1">
            <span style={{ fontWeight: "bold" }}>
              {t("ServiceRequest.PaymentAmount")}:
            </span>{" "}
            {invoice.ammount}
          </Typography>
        </CardContent>
      </Card>

      <InvoiceDetailsModal
        open={open}
        handleClose={handleClose}
        invoice={invoice}
        onPay={() => onPay(invoice.serviceRequestId, invoice.invoiceId)}
        paymentStatus={invoice.paymentStatus}
      />
    </>
  );
};

export default InvoiceListItem;
