package victor.java.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import victor.java.api.model.*;
import victor.java.repository.Invoice.InvoiceRepository;
import victor.java.repository.ServiceLog.ServiceLogRepository;
import victor.java.repository.ServiceRequest.ServiceRequestRepository;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Service
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final ServiceRequestRepository serviceRequestRepository;
    private final ServiceLogRepository serviceLogRepository;

    public InvoiceService(InvoiceRepository invoiceRepository, ServiceRequestRepository serviceRequestRepository, ServiceLogRepository serviceLogRepository) {
        this.invoiceRepository = invoiceRepository;
        this.serviceRequestRepository = serviceRequestRepository;
        this.serviceLogRepository = serviceLogRepository;
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
}
