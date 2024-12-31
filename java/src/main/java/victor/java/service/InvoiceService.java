package victor.java.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import victor.java.api.model.*;
import victor.java.repository.Invoice.InvoiceRepository;
import victor.java.repository.ServiceLog.ServiceLogRepository;
import victor.java.repository.ServiceRequest.ServiceRequestRepository;
import victor.java.repository.User.UserRepository;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final ServiceRequestRepository serviceRequestRepository;
    private final ServiceLogRepository serviceLogRepository;
    private final UserRepository userRepository;

    public InvoiceService(InvoiceRepository invoiceRepository, ServiceRequestRepository serviceRequestRepository, ServiceLogRepository serviceLogRepository, UserRepository userRepository) {
        this.invoiceRepository = invoiceRepository;
        this.serviceRequestRepository = serviceRequestRepository;
        this.serviceLogRepository = serviceLogRepository;
        this.userRepository = userRepository;
    }

    public ResponseEntity<?> generateInvoice(int serviceRequestId) {
        ServiceRequest serviceRequest = serviceRequestRepository.getServiceRequest(serviceRequestId);

        if (serviceRequest == null) {
            return ResponseEntity.notFound().build();
        }

        List<ServiceLog> serviceLogs = serviceLogRepository.getServiceLogList(serviceRequestId);

        if (serviceLogs.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<ServiceType> serviceTypes = serviceLogRepository.getServiceTypeList();

        double totalPrice = 0;
        for (var serviceLog : serviceLogs) {
            var serviceType = serviceTypes.stream()
                    .filter(st -> Objects.equals(st.getName(), serviceLog.getServiceTypeName()))
                    .findFirst()
                    .orElse(null);
            if (serviceType != null) {
                totalPrice += serviceType.getPrice();
            }
        }

        var invoice = new Invoice();
        invoice.setServiceRequestId(serviceRequestId);
        invoice.setInvoiceDate(LocalDate.now());
        invoice.setAmount(totalPrice);
        invoice.setPaymentStatusId(1);

        boolean insertResult = invoiceRepository.insertInvoice(invoice);

        if (!insertResult)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("message", "BackendErrors.ErrorGeneratingInvoice"));

        return ResponseEntity.ok(invoice);
    }

    public ResponseEntity<?> deletePreviousInvoices(int serviceRequestId) {
        boolean deleteResult = invoiceRepository.deletePreviousInvoices(serviceRequestId);

        if (!deleteResult)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("message", "BackendErrors.ErrorDeletingInvoices"));

        return ResponseEntity.ok("Invoices deleted successfully");
    }

    public ResponseEntity<?> getInvoices(String username) {
        User user = userRepository.getUser(username);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("message", "BackendErrors.UserNotFound"));
        }

        List<Invoice> invoices = invoiceRepository.getInvoices(username);

        return ResponseEntity.ok(invoices);
    }

    public ResponseEntity<?> getInvoice(int invoiceId) {
        List<InvoiceDetails> invoiceDetailsList = invoiceRepository.getInvoiceDetails(invoiceId);

        if (invoiceDetailsList.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(invoiceDetailsList);
    }
}
