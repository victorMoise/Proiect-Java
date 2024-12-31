import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
} from "@mui/material";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { green, red } from "@mui/material/colors";
import { getUserRoles } from "../../../api/adminApi";

const EditUserDialog = ({
  open,
  onClose,
  onSave,
  selectedUser,
  setSelectedUser,
}) => {
  const { t } = useTranslation("common");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getUserRoles();
        setRoles(data);
      } catch (error) {
        console.error("Failed to fetch roles", error);
      }
    };

    fetchRoles();
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("Admin.EditUser")}</DialogTitle>
      {selectedUser && (
        <>
          <DialogContent>
            <TextField
              label={t("User.Username")}
              value={selectedUser.username}
              fullWidth
              margin="normal"
              disabled
            />
            <TextField
              label={t("User.Email")}
              value={selectedUser.email}
              fullWidth
              margin="normal"
              disabled
            />
            <TextField
              select
              label={t("User.Role")}
              value={selectedUser.role}
              fullWidth
              margin="normal"
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, role: e.target.value })
              }
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={onClose}
              sx={{
                backgroundColor: red[500],
                color: "white",
                "&:hover": {
                  backgroundColor: red[700],
                },
              }}
            >
              {t("Common.Cancel")}
            </Button>
            <Button
              onClick={onSave}
              sx={{
                backgroundColor: green[500],
                color: "white",
                "&:hover": {
                  backgroundColor: green[700],
                },
              }}
            >
              {t("Common.Save")}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

EditUserDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  selectedUser: PropTypes.object,
  setSelectedUser: PropTypes.func.isRequired,
};

export default EditUserDialog;
