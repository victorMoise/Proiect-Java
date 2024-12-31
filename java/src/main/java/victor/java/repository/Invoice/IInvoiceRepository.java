package victor.java.repository.Invoice;

import victor.java.api.model.Invoice;
import victor.java.api.model.InvoiceDetails;

import java.util.List;

public interface IInvoiceRepository {
    boolean insertInvoice(Invoice invoice);
    boolean deletePreviousInvoices(int serviceRequestId);
    List<Invoice> getInvoices(String username);
    List<InvoiceDetails> getInvoiceDetails(int invoiceId);
}
