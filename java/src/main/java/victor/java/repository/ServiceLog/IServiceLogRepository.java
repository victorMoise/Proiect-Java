package victor.java.repository.ServiceLog;

import victor.java.api.model.ServiceType;
import victor.java.api.request.ServiceLogAddRequest;

import java.util.List;

public interface IServiceLogRepository {
    List<ServiceType> getServiceTypeList();
    boolean addServiceLog(int technicianId, ServiceLogAddRequest request);
}
