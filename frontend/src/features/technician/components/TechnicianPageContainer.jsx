import React, { useEffect, useState } from "react";
import PageContent from "../../../components/PageContent";
import { useTranslation } from "react-i18next";
import TechnicianPageRequestsList from "./TechnicianPageRequestsList";
import WorkTableCard from "./WorkTableCard";
import { getStoredUsername } from "../../../utils/functions/getStoredUsername";
import { getUserRole } from "../../../api/userApi";
import { UserRoles } from "../../../constants/userRoles";
import { LinearProgress, Typography } from "@mui/material";
import Toast from "../../../components/Toast";
import useToast from "../../../hooks/useToast";

const TechnicianPageContainer = () => {
  const { t } = useTranslation("common");
  const username = getStoredUsername();
  const [isTechnician, setIsTechnician] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast, handleClose } = useToast();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const result = await getUserRole(username);
        setIsTechnician(result.roleDescription === UserRoles.ADMIN || result.roleDescription === UserRoles.TECHNICIAN);
      } catch (error) {
        console.error("Error checking admin status:", error);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      checkAdminStatus();
    } else {
      setLoading(false);
    }
  }, [username]);

  if (loading) {
    return <LinearProgress />;
  }

  if (!isTechnician) {
    return (
      <PageContent pageTitle="Admin Page">
        <Typography
          variant="h5"
          style={{
            color: "red",
            fontWeight: "bold",
            textAlign: "center",
            margin: "20px 0",
          }}
        >
          {t("Common.NoPermission")}
        </Typography>
        <Toast toast={toast} handleClose={handleClose} />
      </PageContent>
    );
  }

  return (
    <PageContent pageTitle={t("Sidebar.Technician")}>
      <TechnicianPageRequestsList />
      <WorkTableCard />
    </PageContent>
  );
};

export default TechnicianPageContainer;
