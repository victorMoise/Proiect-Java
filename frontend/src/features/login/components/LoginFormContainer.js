import { useCallback, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import Toast from "../../../components/Toast";
import useToast from "../../../hooks/useToast";
import { loginUser } from "../../../api/userApi";
import PasswordField from "../../../components/PasswordField";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../../../components/LanguageSelector";

function LoginForm() {
  const { login } = useAuth();
  const [form, setForm] = useState({
    username: "admin",
    password: "parolaAdmin",
  });
  const [errors, setErrors] = useState({ username: false, password: false });
  const navigate = useNavigate();
  const { t } = useTranslation("common");
  const { toast, showToast, handleClose } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { username, password } = form;

      try {
        const data = await loginUser(username, password);
        login(data.token, username);
        navigate("/home");
      } catch (error) {
        showToast(t("Login.Error.InvalidCredentials"), "error");
        setErrors({ username: true, password: true });
      }
    },
    [form, login, navigate, showToast, t]
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
        <Card sx={{ padding: 4, boxShadow: 3, borderRadius: 2 }}>
          <Grid container>
            <Grid item container xs={6} md={6} sm={6} alignItems="center">
              <Typography variant="h5" component="h2" gutterBottom>
                {t("Login.Login")}
              </Typography>
            </Grid>
            <Grid
              item
              container
              xs={6}
              md={6}
              sm={6}
              justifyContent="flex-end"
              alignItems="center"
            >
              <LanguageSelector />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            margin="normal"
            type="text"
            label={t("InputFields.Username")}
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            error={errors.username}
            helperText={
              errors.username ? t("Login.Error.UsernameRequired") : ""
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: errors.username ? "red" : "",
                },
              },
            }}
          />
          <PasswordField
            title={t("InputFields.Password")}
            password={form.password}
            setPassword={(e) =>
              handleChange({
                target: { name: "password", value: e.target.value },
              })
            }
            error={errors.password}
            errorText={t("Login.Error.PasswordRequired")}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2, marginBottom: 2 }}
            onClick={handleSubmit}
          >
            {t("Login.LoginButton")}
          </Button>
          <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
            {t("Login.NoAccount")}{" "}
            <Link to={"/register"}>{t("Login.CreateAccount")}</Link>
          </Typography>
        </Card>
      </Grid>
      <Toast toast={toast} handleClose={handleClose} />
    </Grid>
  );
}

export default LoginForm;
