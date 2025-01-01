import React, { useEffect, useState } from 'react';
import TableCard from '../../../components/TableCard';
import { IconButton } from '@mui/material';
import { getAboveAverageClients } from '../../../api/adminApi';
import { useTranslation } from 'react-i18next';
import RefreshIcon from "@mui/icons-material/Refresh";

const AboveAverageUsersCard = (props) => {
  const { showToast } = props;
  const { t } = useTranslation("common");
  const [aboveAverageClients, setAboveAverageClients] = useState([]);

  const fetchAboveAverageClients = async () => {
    try {
      const data = await getAboveAverageClients();
      setAboveAverageClients(data);
    } catch (error) {
      showToast(t("Admin.Statistics.Error.ClientsFetchingError"), "error");
    }
  };

  useEffect(() => {
    fetchAboveAverageClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardActions = [
    <IconButton onClick={fetchAboveAverageClients}>
      <RefreshIcon sx={{ fontSize: 32 }} />
    </IconButton>,
  ];

  const tableHeaders = [
    t("Admin.Statistics.Position"),
    t("Admin.Statistics.Username"),
    t("Admin.Statistics.OrdersPlaced"),
    t("Admin.Statistics.AverageOrdersPlaced")
  ];

  return (
    <TableCard
      title={t("Admin.Statistics.AboveAverageClients")}
      cardActions={cardActions}
      tableHeaders={tableHeaders}
      fetchActions={fetchAboveAverageClients}
      itemList={aboveAverageClients}
    />
  );
};

export default AboveAverageUsersCard;