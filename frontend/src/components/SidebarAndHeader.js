import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  IconButton,
  Box,
  Typography,
  useMediaQuery,
  Toolbar,
  AppBar,
} from "@mui/material";
import { map } from "ramda";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import BuildIcon from "@mui/icons-material/Build";
import { useTheme } from "@mui/material/styles";
import { Logout } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const SidebarAndHeader = (props) => {
  const { t } = useTranslation("common");
  const { pageTitle } = props;
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const menuItems = [
    {
      label: `${t("Sidebar.Home")}`,
      icon: <HomeIcon />,
      onClick: () => {
        navigate("/home");
      },
    },
    {
      label: `${t("Sidebar.Profile")}`,
      icon: <PersonIcon />,
      onClick: () => {
        navigate("/profile");
      },
    },
    {
      label: `${t("Sidebar.Technician")}`,
      icon: <BuildIcon />,
      onClick: () => {
        navigate("/technician");
      },
    },
    {
      label: `${t("Sidebar.Admin")}`,
      icon: <AdminPanelSettingsIcon />,
      onClick: () => {
        navigate("/admin");
      },
    },
    {
      label: `${t("Sidebar.Logout")}`,
      icon: <Logout />,
      onClick: () => {
        logout();
      },
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* HeaderBar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#4a90e2",
          color: "#ffffff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: isMobile ? "100%" : `calc(100% - ${isOpen ? 240 : 60}px)`,
          transition: "width 0.3s ease",
          boxShadow: "none",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Toolbar>
          {/* Sidebar Toggle Button for Mobile */}
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleSidebar}
              sx={{ marginRight: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div">
            {pageTitle}
          </Typography>
          <LanguageSelector />
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        open={isOpen}
        onClose={toggleSidebar}
        sx={{
          width: isOpen ? (isMobile ? "240px" : 240) : 60,
          flexShrink: 0,
          transition: "width 0.3s ease",
          overflowX: "hidden",
          "& .MuiDrawer-paper": {
            width: isOpen ? (isMobile ? "240px" : 240) : 60,
            boxSizing: "border-box",
            backgroundColor: "#f0f0f0",
            boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
            transition: "width 0.3s ease",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        <Box>
          <Divider />
          <List sx={{ paddingTop: "62px" }}>
            {map(
              (item, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={item.onClick}
                  sx={{
                    justifyContent: isOpen ? "flex-start" : "center",
                    "&:hover": {
                      backgroundColor: "#e0e0e0",
                    },
                    cursor: "pointer",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "#1976d2",
                      minWidth: isOpen ? "40px" : "0",
                      justifyContent: isOpen ? "flex-start" : "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {isOpen && <ListItemText primary={item.label} />}
                </ListItem>
              ),
              menuItems
            )}
          </List>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            padding: "16px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Sidebar Toggle Button for Desktop */}
          {!isMobile && (
            <IconButton
              onClick={toggleSidebar}
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "50%",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                margin: isOpen ? "0 auto" : "0",
              }}
            >
              {isOpen ? <ArrowBackIcon /> : <ArrowForwardIcon />}
            </IconButton>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default SidebarAndHeader;
