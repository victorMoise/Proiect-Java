import React from "react";
import { useTranslation } from "react-i18next";
import PageContent from "../../../components/PageContent";
import DeviceListContainer from "./deviceList/DeviceListContainer";
import ServiceRequestListContainer from "./serviceRequestList/ServiceRequestListContainer";
import InvoiceListContainer from "./invoiceList/InvoiceListContainer";

const HomeContainer = () => {
  const { t } = useTranslation("common");
  return (
    <PageContent pageTitle={t("Sidebar.Home")}>
      <DeviceListContainer />
      <ServiceRequestListContainer />
      <InvoiceListContainer />
    </PageContent>
  );
};

export default HomeContainer;
