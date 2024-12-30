package victor.java.repository.ServiceLog;

import victor.java.api.model.ServiceLog;
import victor.java.api.model.ServiceType;
import victor.java.api.request.ServiceLogAddRequest;

import java.util.List;

public interface IServiceLogRepository {
    List<ServiceType> getServiceTypeList();
    boolean addServiceLog(int technicianId, ServiceLogAddRequest request);
    List<ServiceLog> getServiceLogList(String username);
    boolean deleteServiceLog(int serviceLogId);
    List<ServiceLog> getServiceLogList(int serviceRequestId);
}
