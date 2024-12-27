import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { invoiceServiceLogs } from "../../../../api/invoiceApi";
import { red, green } from "@mui/material/colors";

const InvoiceDetailsModal = ({
  open,
  handleClose,
  invoice,
  onPay,
  paymentStatus,
}) => {
  const { t } = useTranslation("common");
  const [serviceLogs, setServiceLogs] = useState([]);

  const handleGetServiceLogs = async () => {
    try {
      const logs = await invoiceServiceLogs(invoice.invoiceId);
      setServiceLogs(logs);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (open) {
      handleGetServiceLogs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{t("Invoices.ServiceLogs.Title")}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {serviceLogs.map((log, index) => (
            <Grid item xs={12} key={index}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {t("Invoices.ServiceLogs.ServiceLog")} {index + 1}
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <span style={{ fontWeight: "bold" }}>
                        {t("Invoices.ServiceLogs.TechnicianName")}:
                      </span>{" "}
                      {log.technicianName}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <span style={{ fontWeight: "bold" }}>
                        {t("Invoices.ServiceLogs.ServiceDate")}:
                      </span>{" "}
                      {log.serviceDate}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <span style={{ fontWeight: "bold" }}>
                        {t("Invoices.ServiceLogs.IssueDescription")}:
                      </span>{" "}
                      {log.issueDescription}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <span style={{ fontWeight: "bold" }}>
                        {t("Invoices.ServiceLogs.Notes")}:
                      </span>{" "}
                      {log.notes}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <span style={{ fontWeight: "bold" }}>
                        {t("Invoices.ServiceLogs.ServiceTypeName")}:
                      </span>{" "}
                      {log.serviceTypeName}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <span style={{ fontWeight: "bold" }}>
                        {t("Invoices.ServiceLogs.ServiceTypePrice")}:
                      </span>{" "}
                      {log.price}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
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
          {t("Common.Close")}
        </Button>
        {paymentStatus === "Pending" ? (
          <Button
            onClick={onPay}
            variant="contained"
            size="small"
            sx={{
              backgroundColor: green[500],
              color: "white",
              "&:hover": {
                backgroundColor: green[700],
              },
            }}
          >
            {t("Common.Pay")}
          </Button>
        ) : (
          <Button variant="contained" size="small" disabled sx={{ ml: 1 }}>
            {t("Common.Paid")}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default InvoiceDetailsModal;
