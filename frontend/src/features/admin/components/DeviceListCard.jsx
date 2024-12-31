import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getDeviceList } from "../../../api/adminApi";
import { useTranslation } from "react-i18next";
import RefreshIcon from "@mui/icons-material/Refresh";
import TableCard from "../../../components/TableCard";

const DeviceListCard = (props) => {
  const { showToast } = props;
  const { t } = useTranslation("common");

  const [deviceList, setDeviceList] = useState([]);

  useEffect(() => {
    fetchDevices();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDevices = async () => {
    try {
      const devices = await getDeviceList();
      devices.forEach(element => {
        delete element.deviceId;
      });

      setDeviceList(devices);
    } catch (error) {
      showToast(t("Admin.ErrorFetchingDevices"), "error");
    }
  };

  const cardActions = [
    <IconButton onClick={fetchDevices}>
      <RefreshIcon sx={{ fontSize: 32 }} />
    </IconButton>,
  ];

  const tableHeaders = [
    t("Device.Client"),
    t("Device.Type"),
    t("Device.Brand"),
    t("Device.Model"),
    t("Device.SerialNumber"),
  ];

  return (
    <TableCard
      title={t("Admin.DeviceList")}
      cardActions={cardActions}
      tableHeaders={tableHeaders}
      fetchAction={fetchDevices}
      itemList={deviceList.map(({ clientId, ...rest }) => rest)}
    />
  );
};

export default DeviceListCard;
