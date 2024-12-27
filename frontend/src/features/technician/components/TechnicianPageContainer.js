import React from "react";
import PageContent from "../../../components/PageContent";
import { useTranslation } from "react-i18next";
import TechnicianPageRequestsList from "./TechnicianPageRequestsList";
import WorkTableCard from "./WorkTableCard";

const TechnicianPageContainer = () => {
  const { t } = useTranslation("common");

  return (
    <PageContent pageTitle={t("Sidebar.Technician")}>
      <TechnicianPageRequestsList />
      <WorkTableCard />
    </PageContent>
  );
};

export default TechnicianPageContainer;
