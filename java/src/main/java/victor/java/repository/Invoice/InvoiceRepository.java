package victor.java.repository.Invoice;

import org.springframework.stereotype.Repository;
import victor.java.repository.DatabaseManager;
import victor.java.api.model.Invoice;

@Repository
public class InvoiceRepository implements IInvoiceRepository {
    private final DatabaseManager databaseManager;

    public InvoiceRepository(DatabaseManager databaseManager) {
        this.databaseManager = databaseManager;
    }

    @Override
    public boolean insertInvoice(Invoice invoice) {
        String query = """
            INSERT INTO Invoices (ServiceRequestId, InvoiceDate, Amount, PaymentStatusId)
            VALUES (?, ?, ?, ?)
        """;

        try {
            var connection = databaseManager.getConnection();
            var statement = connection.prepareStatement(query);
            statement.setInt(1, invoice.getServiceRequestId());
            statement.setDate(2, java.sql.Date.valueOf(invoice.getInvoiceDate()));
            statement.setDouble(3, invoice.getAmount());
            statement.setInt(4, invoice.getPaymentStatusId());

            statement.executeUpdate();
        } catch (Exception ex) {
            throw new RuntimeException("Failed to insert invoice", ex);
        }

        return true;
    }

    @Override
    public boolean deletePreviousInvoices(int serviceRequestId) {
        String query = "DELETE FROM Invoices WHERE ServiceRequestId = ?";

        try {
            var connection = databaseManager.getConnection();
            var statement = connection.prepareStatement(query);
            statement.setInt(1, serviceRequestId);

            statement.executeUpdate();
        } catch (Exception ex) {
            throw new RuntimeException("Failed to delete previous invoice", ex);
        }

        return true;
    }
}
