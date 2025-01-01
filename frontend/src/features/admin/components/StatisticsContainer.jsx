import { Grid, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import TableCard from "../../../components/TableCard";
import { useTranslation } from "react-i18next";
import { getAboveAverageTechnicians } from "../../../api/adminApi";
import RefreshIcon from "@mui/icons-material/Refresh";

const StatisticsContainer = (props) => {
  const { showToast } = props;
  const { t } = useTranslation("common");
  const [aboveAverageTechnicians, setAboveAverageTechnicians] = useState([]);

  const fetchAboveAverageTechnicians = async () => {
    try {
      const data = await getAboveAverageTechnicians();
      setAboveAverageTechnicians(data);
    } catch (error) {
      showToast(t("Admin.Statistics.Error.FetchingError"), "error");
    }
  };

  useEffect(() => {
    fetchAboveAverageTechnicians();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardActions = [
    <IconButton onClick={fetchAboveAverageTechnicians}>
      <RefreshIcon sx={{ fontSize: 32 }} />
    </IconButton>,
  ];

  const tableHeaders = [
    t("Admin.Statistics.Position"),
    t("Admin.Statistics.Username"),
    t("Admin.Statistics.ServicesLogged"),
    t("Admin.Statistics.AverageServicesLogged"),
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6}>
        <TableCard
          title={t("Admin.Statistics.AboveAverageTechnicians")}
          cardActions={cardActions}
          tableHeaders={tableHeaders}
          fetchActions={fetchAboveAverageTechnicians}
          itemList={aboveAverageTechnicians}
        />
      </Grid>
    </Grid>
  );
};

export default StatisticsContainer;
