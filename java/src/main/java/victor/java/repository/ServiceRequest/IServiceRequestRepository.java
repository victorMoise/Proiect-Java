package victor.java.repository.ServiceRequest;

import victor.java.api.model.ServiceRequest;
import victor.java.api.request.ServiceRequestAddRequest;

import java.util.List;

public interface IServiceRequestRepository {
    boolean deviceHasServiceRequest(int deviceId);
    List<ServiceRequest> getServiceRequestList(String username);
    ServiceRequest addServiceRequest(ServiceRequestAddRequest request);
    boolean deleteServiceRequest(int serviceRequestId);
    boolean updateServiceRequestStatus(int serviceRequestId, int statusId);
}
