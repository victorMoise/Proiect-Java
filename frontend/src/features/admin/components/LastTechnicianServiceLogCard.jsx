import React, { useEffect, useState } from "react";
import TableCard from "../../../components/TableCard";
import { useTranslation } from "react-i18next";
import { getLastTechnicianServiceDate } from "../../../api/adminApi";
import { IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const LastTechnicianServiceLogCard = (props) => {
  const { showToast } = props;
  const { t } = useTranslation("common");
  const [lastServiceDates, setLastServiceDates] = useState([]);

  const fetchLastServiceDates = async () => {
    try {
      const data = await getLastTechnicianServiceDate();
      setLastServiceDates(data);
    } catch (error) {
      showToast(
        t("Admin.Statistics.Error.LastServiceDatesFetchingError"),
        "error"
      );
    }
  };

  useEffect(() => {
    fetchLastServiceDates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardActions = [
    <IconButton onClick={fetchLastServiceDates}>
      <RefreshIcon sx={{ fontSize: 32 }} />
    </IconButton>,
  ];

  const tableHeaders = [
    t("Admin.Statistics.Username"),
    t("Admin.Statistics.Date"),
    t("Admin.Statistics.ServiceType"),
  ];

  return (
    <TableCard
      title={t("Admin.Statistics.LastTechnicianServiceLog")}
      cardActions={cardActions}
      tableHeaders={tableHeaders}
      fetchActions={fetchLastServiceDates}
      itemList={lastServiceDates}
    />
  );
};

export default LastTechnicianServiceLogCard;
