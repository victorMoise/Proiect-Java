package victor.java.api.model;

import java.time.LocalDate;

public class Invoice {
    private int invoiceId;
    private int serviceRequestId;
    private LocalDate invoiceDate;
    private double amount;
    private int paymentStatusId;

    public Invoice() {
    }

    public Invoice(int invoiceId, int serviceRequestId, LocalDate invoiceDate, double amount, int paymentStatusId) {
        this.invoiceId = invoiceId;
        this.serviceRequestId = serviceRequestId;
        this.invoiceDate = invoiceDate;
        this.amount = amount;
        this.paymentStatusId = paymentStatusId;
    }

    public int getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(int invoiceId) {
        this.invoiceId = invoiceId;
    }

    public int getServiceRequestId() {
        return serviceRequestId;
    }

    public void setServiceRequestId(int serviceRequestId) {
        this.serviceRequestId = serviceRequestId;
    }

    public LocalDate getInvoiceDate() {
        return invoiceDate;
    }

    public void setInvoiceDate(LocalDate invoiceDate) {
        this.invoiceDate = invoiceDate;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public int getPaymentStatusId() {
        return paymentStatusId;
    }

    public void setPaymentStatusId(int paymentStatusId) {
        this.paymentStatusId = paymentStatusId;
    }
}
