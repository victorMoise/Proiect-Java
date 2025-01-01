import { IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import React, { useEffect, useState } from "react";
import { getUserList, updateUserRole } from "../../../api/adminApi";
import PropTypes from "prop-types";
import TableCard from "../../../components/TableCard";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import EditUserDialog from "./EditUserDialog";

const UserListCard = (props) => {
  const { username, showToast } = props;
  const [userList, setUserList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { t } = useTranslation("common");

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUsers = async () => {
    try {
      const users = await getUserList(username);

      setUserList(users);
    } catch (error) {
      showToast(t("Admin.ErrorFetchingUsers"), "error");
    }
  };

  const handleEditUser = (id) => {
    const user = userList.find((user) => user.id === id);
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleSave = async () => {
    try {
      await updateUserRole(selectedUser.username, selectedUser.role);
      showToast(t("Admin.UserRoleUpdated"), "success");
      fetchUsers();
    } catch (error) {
      showToast(t(error.response.data.message) || "No user role selected", "error");
    }
    setOpen(false);
  };

  const cardActions = [
    <IconButton onClick={fetchUsers}>
      <RefreshIcon sx={{ fontSize: 32 }} />
    </IconButton>,
  ];

  const itemActions = (id) => [
    <IconButton onClick={() => handleEditUser(id)}>
      <EditIcon />
    </IconButton>,
  ];

  const tableHeaders = [
    t("User.Id"),
    t("User.Username"),
    t("User.FirstName"),
    t("User.LastName"),
    t("User.Email"),
    t("User.PhoneNumber"),
    t("User.Address"),
    t("User.Role"),
  ];

  return (
    <>
      <TableCard
        title={t("Admin.UserList")}
        cardActions={cardActions}
        tableHeaders={tableHeaders}
        fetchAction={fetchUsers}
        itemList={userList}
        itemActions={(item) => itemActions(item.id)}
      />
      <EditUserDialog
        open={open}
        onClose={handleClose}
        onSave={handleSave}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </>
  );
};

UserListCard.propTypes = {
  username: PropTypes.string.isRequired,
  showToast: PropTypes.func.isRequired,
};

export default UserListCard;
