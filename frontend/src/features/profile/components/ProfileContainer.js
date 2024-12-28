import React, { useEffect, useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import PageContent from "../../../components/PageContent";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { getUserInfo, updateUserInfo } from "../../../api/userApi";
import { initialState, profileReducer } from "../reducer";
import { updateUsernameInStorage } from "../../../utils/functions/updateUsernameInStorage";
import useToast from "../../../hooks/useToast";
import Toast from "../../../components/Toast";

const ProfileContainer = () => {
  const { t } = useTranslation("common");
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const username = localStorage.getItem("username");
  const [profileDetails, dispatch] = useReducer(profileReducer, initialState);
  const { toast, showToast, handleClose } = useToast();

  const onFieldChange = (field) => (event) => {
    dispatch({ type: "UPDATE_FIELD", field, value: event.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      await updateUserInfo(username, profileDetails);
      showToast(t("Profile.ProfileUpdated"), "success");
      updateUsernameInStorage(profileDetails.username);
    }
    catch (error) {
      showToast(t(error.response.data.message), "error");
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo(username);
        setUserInfo(data);
        dispatch({ type: "SET_PROFILE", payload: data });
      } catch (error) {
        setError(error.message);
      } 
    };

    if (username) {
      fetchUserInfo();
    } 
  }, [username]);

  if (error) {
    showToast(t("Profile.ErrorFetchingData"), "error");
  }

  return (
    <PageContent pageTitle={t("Sidebar.Profile")}>
      <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h4">{t("Profile.ProfileDetails")}</Typography>
          {userInfo && (
            <Grid container spacing={2} sx={{ paddingTop: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t("InputFields.Username")}
                  value={profileDetails.username || ""}
                  onChange={onFieldChange("username")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t("InputFields.Email")}
                  value={profileDetails.email || ""}
                  onChange={onFieldChange("email")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t("InputFields.FirstName")}
                  value={profileDetails.firstName || ""}
                  onChange={onFieldChange("firstName")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t("InputFields.LastName")}
                  value={profileDetails.lastName || ""}
                  onChange={onFieldChange("lastName")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t("InputFields.PhoneNumber")}
                  value={profileDetails.phoneNumber || ""}
                  onChange={onFieldChange("phoneNumber")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t("InputFields.Address")}
                  value={profileDetails.address || ""}
                  onChange={onFieldChange("address")}
                />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2, marginBottom: 2 }}
                  onClick={handleSaveChanges}
                >
                  {t("Profile.SaveChanges")}
                </Button>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
      <Toast toast={toast} handleClose={handleClose} />
    </PageContent>
  );
};

export default ProfileContainer;
