import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <FormControl variant="outlined" size="small" sx={{ marginLeft: "auto" }}>
      <Select
        value={i18n.language}
        onChange={handleChange}
        displayEmpty
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
      >
        <MenuItem value="en">
          <ReactCountryFlag
            countryCode="GB"
            svg
            style={{
              width: "1.5em",
              height: "1.5em",
              marginRight: "0.5em",
            }}
            title="GB"
          />
          English
        </MenuItem>
        <MenuItem value="ro">
          <ReactCountryFlag
            countryCode="RO"
            svg
            style={{
              width: "1.5em",
              height: "1.5em",
              marginRight: "0.5em",
            }}
            title="RO"
          />
          Romanian
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
