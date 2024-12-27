import { Card, Grid } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import useToast from "../../../hooks/useToast";
import Toast from "../../../components/Toast";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../api/userApi";
import Header from "./RegisterHeader";
import InputFields from "./RegisterInputFields";
import SubmitButton from "./RegisterSubmitButton";

const errorEmptyUsername = "BackendErrors.EmptyUsername";
const errorEmptyEmail = "BackendErrors.EmptyEmail";
const errorEmptyPassword = "BackendErrors.EmptyPassword";
const errorEmptyConfirmPassword = "BackendErrors.EmptyConfirmPassword";
const errorWeakPassword = "BackendErrors.WeakPassword";

const RegisterForm = () => {
  const { t } = useTranslation("common");
  const { toast, showToast, handleClose } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { username, email, password, confirmPassword } = form;

      if (!username || !email || !password || !confirmPassword) {
        setErrors({
          username: !username,
          email: !email,
          password: !password,
          confirmPassword: !confirmPassword,
        });

        showToast(
          t(
            !username && !email && !password && !confirmPassword
              ? "Signup.Error.AllFieldsRequired"
              : !username
              ? "Signup.Error.UsernameRequired"
              : !email
              ? "Signup.Error.EmailRequired"
              : !password
              ? "Signup.Error.PasswordRequired"
              : "Signup.Error.ConfirmPasswordRequired"
          ),
          "error"
        );
        return;
      }

      if (password !== confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          password: true,
          confirmPassword: true,
        }));
        showToast(t("Signup.Error.PasswordsDoNotMatch"), "error");
        return;
      }

      try {
        await registerUser(username, email, password);
        showToast(
          "Account created successfully. Redirecting to login...",
          "success"
        );

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        const errorMessage =
          t(error.response?.data?.message) ||
          t(error?.message) ||
          "An error occurred";
        showToast(errorMessage, "error");
        errorMessage === t(errorEmptyUsername) &&
          setErrors({ ...errors, username: true });
        errorMessage === t(errorEmptyEmail) &&
          setErrors({ ...errors, email: true });
        errorMessage === t(errorEmptyPassword) &&
          setErrors({ ...errors, password: true });
        errorMessage === t(errorEmptyConfirmPassword) &&
          setErrors({ ...errors, confirmPassword: true });
        errorMessage === t(errorWeakPassword) &&
          setErrors({ ...errors, password: true });
      }
    },
    [errors, form, navigate, showToast, t]
  );

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "75vh" }}
    >
      <Grid
        item
        xs={12}
        sm={8}
        md={4}
        sx={{ maxWidth: "700px", width: "100%" }}
      >
        <Card
          sx={{
            padding: 4,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "#ffffff",
          }}
        >
          <Header t={t} />
          <InputFields
            form={form}
            errors={errors}
            handleChange={handleChange}
          />
          <SubmitButton handleSubmit={handleSubmit} t={t} />
        </Card>
      </Grid>
      <Toast toast={toast} handleClose={handleClose} />
    </Grid>
  );
};

export default RegisterForm;
