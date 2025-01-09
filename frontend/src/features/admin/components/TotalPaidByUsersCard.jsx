import React, { useEffect, useState } from "react";
import TableCard from "../../../components/TableCard";
import { useTranslation } from "react-i18next";
import { getTotalPaidByUsers } from "../../../api/adminApi";
import { IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const TotalPaidByUsersCard = (props) => {
  const { showToast } = props;
  const { t } = useTranslation("common");
  const [totalPaidByUsers, setTotalPaidByUsers] = useState([]);

  const fetchTotalPaidByUsers = async () => {
    try {
      const data = await getTotalPaidByUsers();
      data.forEach((element) => {
        delete element.averageCount;
      });

      setTotalPaidByUsers(data);
    } catch (error) {
      showToast(
        t("Admin.Statistics.Error.TotalPaidByUsersFetchingError"),
        "error"
      );
    }
  };

  useEffect(() => {
    fetchTotalPaidByUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardActions = [
    <IconButton onClick={fetchTotalPaidByUsers}>
      <RefreshIcon sx={{ fontSize: 32 }} />
    </IconButton>,
  ];

  const tableHeaders = [
    t("Admin.Statistics.Position"),
    t("Admin.Statistics.Username"),
    t("Admin.Statistics.Paid"),
  ];

  return (
    <TableCard
      title={t("Admin.Statistics.TotalPaidByUsers")}
      cardActions={cardActions}
      tableHeaders={tableHeaders}
      fetchActions={fetchTotalPaidByUsers}
      itemList={totalPaidByUsers}
    />
  );
};

export default TotalPaidByUsersCard;
