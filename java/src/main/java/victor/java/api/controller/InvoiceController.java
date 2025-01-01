package victor.java.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import victor.java.service.InvoiceService;

@RestController
public class InvoiceController {
    private final InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @GetMapping("/invoice/list")
    public ResponseEntity<?> getInvoices(@RequestParam String username) {
        return invoiceService.getInvoices(username);
    }

    @GetMapping("/invoice/{invoiceId}")
    public ResponseEntity<?> getInvoice(@PathVariable int invoiceId) {
        return invoiceService.getInvoice(invoiceId);
    }

    @PostMapping("/invoice/{serviceRequestId}")
    public ResponseEntity<?> generateInvoice(@PathVariable int serviceRequestId) {
        return invoiceService.generateInvoice(serviceRequestId);
    }

    @DeleteMapping("/invoice/previous")
    public ResponseEntity<?> deletePreviousInvoices(@RequestParam int serviceRequestId) {
        return invoiceService.deletePreviousInvoices(serviceRequestId);
    }

    @PutMapping("/invoice/status")
    public ResponseEntity<?> updateInvoiceStatus(@RequestParam int invoiceId, @RequestParam String paymentStatusId) {
        return invoiceService.updateInvoiceStatus(invoiceId, paymentStatusId);
    }
}
