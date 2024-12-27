import { IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import React, { useEffect, useState } from "react";
import { getUserList } from "../../../api/adminApi";
import PropTypes from "prop-types";
import TableCard from "../../../components/TableCard";
import { useTranslation } from "react-i18next";

const UserListCard = (props) => {
  const { username, showToast } = props;
  const [userList, setUserList] = useState([]);
  const { t } = useTranslation("common");

  useEffect(() => {
    fetchUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUsers = async () => {
    try {
      const users = await getUserList(username);
      users.forEach(element => {
        delete element.id;
      });

      setUserList(users);
    } catch (error) {
      showToast(t("Admin.ErrorFetchingUsers"), "error");
    }
  };

  const cardActions = [
    <IconButton onClick={fetchUsers}>
      <RefreshIcon sx={{ fontSize: 32 }} />
    </IconButton>,
  ];

  const tableHeaders = [
    t("User.Username"),
    t("User.FirstName"),
    t("User.LastName"),
    t("User.Email"),
    t("User.PhoneNumber"),
    t("User.Address"),
    t("User.Role"),
  ];

  return (
    <TableCard
      title={t("Admin.UserList")}
      cardActions={cardActions}
      tableHeaders={tableHeaders}
      fetchAction={fetchUsers}
      itemList={userList}
    />
  );
};

UserListCard.propTypes = {
  username: PropTypes.string.isRequired,
};

export default UserListCard;
