import { IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TableCard from "../../../components/TableCard";
import { useTranslation } from "react-i18next";
import useToast from "../../../hooks/useToast";
import Toast from "../../../components/Toast";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteWork, getUsersWork } from "../../../api/serviceLogApi";

const WorkTableCard = () => {
  const { t } = useTranslation("common");
  const [workList, setWorkList] = useState([]);
  const { toast, showToast, handleClose } = useToast();

  useEffect(() => {
    fetchWork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchWork = async () => {
    try {
      const workList = await getUsersWork();
      setWorkList(workList);
    } catch (error) {
      showToast(t("Technician.ErrorFetchingUsersWork"), "error");
    }
  };

  const handleDeleteWork = async (serviceLogId) => {
    try {
      await deleteWork(serviceLogId);
      showToast(t("Technician.Request.DeleteWorkSuccess"), "success");
      fetchWork();
    } catch (error) {
      showToast(t(error.response.data.message), "error");
    }
  };

  const cardActions = [
    <IconButton onClick={fetchWork}>
      <RefreshIcon sx={{ fontSize: 32 }} />
    </IconButton>,
  ];

  const tableHeaders = [
    t("ServiceLogsList.Id"),
    t("ServiceLogsList.DeviceName"),
    t("ServiceLogsList.ClientName"),
    t("ServiceLogsList.DateLogged"),
    t("ServiceLogsList.Notes"),
    t("ServiceLogsList.ServiceTypeName"),
  ];

  const itemActions = (serviceLogId) => [
    <IconButton onClick={() => handleDeleteWork(serviceLogId)}>
      <DeleteIcon />
    </IconButton>,
  ];

  return (
    <>
      <TableCard
        title={t("Technician.Request.MyWork")}
        cardActions={cardActions}
        tableHeaders={tableHeaders}
        fetchAction={fetchWork}
        itemList={workList}
        itemActions={(item) => itemActions(item.id)}
      />
      <Toast toast={toast} handleClose={handleClose} />
    </>
  );
};

WorkTableCard.propTypes = {
  username: PropTypes.string.isRequired,
};

export default WorkTableCard;
