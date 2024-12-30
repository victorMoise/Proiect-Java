package victor.java.repository.Invoice;

import victor.java.api.model.Invoice;

public interface IInvoiceRepository {
    boolean insertInvoice(Invoice invoice);
}
