import { Card, CardContent, Typography, IconButton, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  addDevice,
  deleteDevice,
  getUsersDevices,
  updateDevice,
} from "../../../../api/deviceApi";
import RefreshIcon from "@mui/icons-material/Refresh";
import useToast from "../../../../hooks/useToast";
import Toast from "../../../../components/Toast";
import DeviceListItem from "./DeviceListItem";
import DeviceDialog from "./DeviceDialog";

const DeviceListContainer = () => {
  const { t } = useTranslation("common");
  const [deviceList, setDeviceList] = useState([]);
  const { toast, showToast, handleClose: handleCloseToast } = useToast();
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleOpen = (device = null) => {
    if (device) {
      setSelectedDevice(device);
      setIsEdit(true);
    } else {
      setSelectedDevice(null);
      setIsEdit(false);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async (deviceData) => {
    try {
      if (isEdit) {
        await updateDevice(selectedDevice.deviceId, deviceData);
        showToast(t("Home.DeviceList.UpdatedSuccessfully"), "success");
      } else {
        await addDevice(deviceData);
        showToast(t("Home.DeviceList.SavedSuccessfully"), "success");
      }
      handleGetDeviceList();
    } catch (error) {
      showToast(t(error.response.data.message), "error");
    }
    setOpen(false);
  };

  const handleDelete = async (deviceId) => {
    try {
      await deleteDevice(deviceId);
      showToast(t("Home.DeviceList.DeletedSuccessfully"), "success");
      handleGetDeviceList();
    } catch (error) {
      showToast(t(error.response.data.message), "error");
    }
  };

  const handleGetDeviceList = async () => {
    try {
      const devices = await getUsersDevices();
      const devicesWithoutClientName = devices.map(
        ({ clientName, ...rest }) => rest
      );
      setDeviceList(devicesWithoutClientName);
    } catch (error) {
      showToast(t("Home.DeviceList.Error.FetchingError"), "error");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleGetDeviceList();
    }, 10);

    return () => clearTimeout(timer); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardActions = [
    <IconButton key="add" onClick={() => handleOpen()}>
      <AddIcon />
    </IconButton>,
    <IconButton key="refresh" onClick={handleGetDeviceList}>
      <RefreshIcon />
    </IconButton>
  ];

  return (
    <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, marginBottom: 2 }}>
      <CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Typography variant="h5">{t("Home.DeviceList.Title")}</Typography>
          {cardActions && <div>{cardActions}</div>}
        </div>

        <Grid container spacing={3}>
          {deviceList.map((device, index) => (
            <Grid item xs={12} sm={12} md={12} lg={6} xl={4} key={index}>
              <DeviceListItem
                device={device}
                index={index}
                onEdit={() => handleOpen(device)}
                onDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>

        <DeviceDialog
          open={open}
          handleClose={handleClose}
          handleSave={handleSave}
          device={selectedDevice}
          isEdit={isEdit}
        />
      </CardContent>
      <Toast toast={toast} handleClose={handleCloseToast} />
    </Card>
  );
};

export default DeviceListContainer;
