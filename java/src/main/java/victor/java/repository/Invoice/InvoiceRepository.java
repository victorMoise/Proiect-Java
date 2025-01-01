package victor.java.repository.Invoice;

import org.springframework.stereotype.Repository;
import victor.java.api.model.InvoiceDetails;
import victor.java.repository.DatabaseManager;
import victor.java.api.model.Invoice;

import java.util.ArrayList;
import java.util.List;

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

    @Override
    public List<Invoice> getInvoices(String username) {
        String query = """
            SELECT i.InvoiceId, sr.ServiceRequestId, d.DeviceId, d.Brand, d.Model, d.SerialNumber, sr.IssueDescription, ds.StatusName as Status, i.Amount as Amount, RTRIM(dps.Name) AS PaymentStatus
            FROM Invoices i
            INNER JOIN ServiceRequests sr ON i.ServiceRequestId = sr.ServiceRequestId
            INNER JOIN Devices d ON sr.DeviceId = d.DeviceId
            INNER JOIN DictionaryStatus ds ON sr.StatusId = ds.StatusId
            INNER JOIN DictionaryPaymentStatus dps ON i.PaymentStatusId = dps.PaymentStatusId
            INNER JOIN Users u ON d.ClientId = u.Id
            WHERE u.Username = ?
        """;

        try {
            var connection = databaseManager.getConnection();
            var statement = connection.prepareStatement(query);
            statement.setString(1, username);

            var resultSet = statement.executeQuery();
            List<Invoice> invoices = new ArrayList<>();
            while (resultSet.next()) {
                var invoice = new Invoice();
                invoice.setInvoiceId(resultSet.getInt("InvoiceId"));
                invoice.setServiceRequestId(resultSet.getInt("ServiceRequestId"));
                invoice.setDeviceId(resultSet.getInt("DeviceId"));
                invoice.setBrand(resultSet.getString("Brand"));
                invoice.setModel(resultSet.getString("Model"));
                invoice.setSerialNumber(resultSet.getString("SerialNumber"));
                invoice.setIssueDescription(resultSet.getString("IssueDescription"));
                invoice.setStatus(resultSet.getString("Status"));
                invoice.setAmount(resultSet.getDouble("Amount"));
                invoice.setPaymentStatus(resultSet.getString("PaymentStatus"));
                invoices.add(invoice);
            }

            return invoices;
        } catch (Exception ex) {
            throw new RuntimeException("Failed to get invoices", ex);
        }
    }

    public List<InvoiceDetails> getInvoiceDetails(int invoiceId) {
        String query = """
            SELECT 
                i.InvoiceID, 
                sr.IssueDescription, 
                sl.ServiceDate, 
                sl.Notes, 
                dst.Name AS ServiceTypeName, 
                dst.Price, 
                u.Username AS TechnicianName
            FROM Invoices i
            INNER JOIN ServiceRequests sr ON i.ServiceRequestID = sr.ServiceRequestID
            INNER JOIN ServiceLogs sl ON sr.ServiceRequestID = sl.ServiceRequestID
            INNER JOIN Users u ON sl.TechnicianID = u.Id
            INNER JOIN DictionaryServiceType dst ON sl.ServiceTypeId = dst.ServiceTypeId
            WHERE i.InvoiceID = ?
        """;

        try {
            var connection = databaseManager.getConnection();
            var statement = connection.prepareStatement(query);
            statement.setInt(1, invoiceId);

            var resultSet = statement.executeQuery();
            List<InvoiceDetails> invoiceDetailsList = new ArrayList<>();
            while (resultSet.next()) {
                var invoiceDetails = new InvoiceDetails();
                invoiceDetails.setInvoiceId(resultSet.getInt("InvoiceID"));
                invoiceDetails.setIssueDescription(resultSet.getString("IssueDescription"));
                invoiceDetails.setServiceDate(resultSet.getDate("ServiceDate"));
                invoiceDetails.setTechnicianNotes(resultSet.getString("Notes"));
                invoiceDetails.setServiceTypeName(resultSet.getString("ServiceTypeName"));
                invoiceDetails.setAmount(resultSet.getDouble("Price"));
                invoiceDetails.setTechnicianName(resultSet.getString("TechnicianName"));
                invoiceDetailsList.add(invoiceDetails);
            }

            return invoiceDetailsList;
        } catch (Exception ex) {
            throw new RuntimeException("Failed to get invoice details", ex);
        }
    }

    @Override
    public boolean updateInvoiceStatus(int invoiceId, String paymentStatusId) {
        String query = "UPDATE Invoices SET PaymentStatusID = ? WHERE InvoiceID = ?";

        try {
            var connection = databaseManager.getConnection();
            var statement = connection.prepareStatement(query);
            statement.setString(1, paymentStatusId);
            statement.setInt(2, invoiceId);

            statement.executeUpdate();
        } catch (Exception ex) {
            throw new RuntimeException("Failed to update invoice status", ex);
        }

        return true;
    }
}
