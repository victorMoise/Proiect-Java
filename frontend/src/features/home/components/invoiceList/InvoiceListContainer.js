import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  getUsersInvoices,
  updateInvoiceStatus,
} from "../../../../api/invoiceApi";
import useToast from "../../../../hooks/useToast";
import Toast from "../../../../components/Toast";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useTranslation } from "react-i18next";
import InvoiceListItem from "./InvoiceListItem";
import { updateRequestStatus } from "../../../../api/serviceRequestApi";

const InvoiceListContainer = () => {
  const [invoices, setInvoices] = useState([]);
  const { toast, showToast, handleClose: handleCloseToast } = useToast();
  const { t } = useTranslation("common");

  const handleGetInvoiceList = async () => {
    try {
      const invoiceList = await getUsersInvoices();
      setInvoices(invoiceList);
    } catch (error) {
      showToast(t("Home.InvoiceList.Error.FetchingError"), "error");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleGetInvoiceList();
    }, 10);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePay = async (requestId, invoiceId) => {
    try {
      await updateRequestStatus(requestId, 6);
      await updateInvoiceStatus(invoiceId, 2);
      showToast(t("Home.InvoiceList.Success.PaymentSuccess"), "success");
      handleGetInvoiceList();
    } catch (error) {
      showToast(t("Invoices.Error.PaymentError"), "error");
    }
  };

  const cardActions = [
    <IconButton key="refresh" onClick={handleGetInvoiceList}>
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
            <Typography variant="h5">{t("Home.InvoiceList.Title")}</Typography>
            {cardActions && <div>{cardActions}</div>}
          </div>

          <Grid container spacing={3}>
            {invoices.map((invoice, index) => (
              <Grid item xs={12} sm={12} md={12} lg={6} xl={4} key={index}>
                <InvoiceListItem
                  invoice={invoice}
                  index={index}
                  onPay={() => handlePay(invoice.id, invoice.invoiceId)}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      <Toast toast={toast} handleClose={handleCloseToast} />
    </>
  );
};

export default InvoiceListContainer;
