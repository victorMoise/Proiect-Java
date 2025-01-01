import React, { useEffect, useState } from "react";
import PageContent from "../../../components/PageContent";
import { getStoredUsername } from "../../../utils/functions/getStoredUsername";
import { getUserRole } from "../../../api/userApi";
import { UserRoles } from "../../../constants/userRoles";
import { LinearProgress, Typography } from "@mui/material";
import UserListCard from "./UserListCard";
import Toast from "../../../components/Toast";
import useToast from "../../../hooks/useToast";
import StatisticsContainer from "./StatisticsContainer";
import { useTranslation } from "react-i18next";

const AdminPageContainer = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const username = getStoredUsername();
  const { toast, showToast, handleClose } = useToast();
  const { t } = useTranslation("common");

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const result = await getUserRole(username);
        setIsAdmin(result.roleDescription === UserRoles.ADMIN);
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

  if (!isAdmin) {
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
    <PageContent pageTitle="Admin">
      <UserListCard username={username} showToast={showToast} />
      <StatisticsContainer showToast={showToast} />
      <Toast toast={toast} handleClose={handleClose} />
    </PageContent>
  );
};

export default AdminPageContainer;
