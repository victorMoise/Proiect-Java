import React from "react";
import { Grid } from "@mui/material";
import AboveAverageTechniciansCard from "./AboveAverageTechniciansCard";
import AboveAverageUsersCard from "./AboveAverageUsersCard";
import TotalPaidByUsersCard from "./TotalPaidByUsersCard";
import LastTechnicianServiceLogCard from "./LastTechnicianServiceLogCard";


const StatisticsContainer = (props) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6}>
        <AboveAverageTechniciansCard showToast={props.showToast} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <AboveAverageUsersCard showToast={props.showToast} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TotalPaidByUsersCard showToast={props.showToast} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <LastTechnicianServiceLogCard showToast={props.showToast} />
      </Grid>
    </Grid>
  );
};

export default StatisticsContainer;
