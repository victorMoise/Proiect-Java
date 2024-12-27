import React from "react";
import { Box } from "@mui/material";
import SidebarAndHeader from "./SidebarAndHeader";


const PageContent = ({ pageTitle, children }) => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <SidebarAndHeader pageTitle={pageTitle} />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginTop: { xs: "56px", sm: "64px" },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PageContent;
