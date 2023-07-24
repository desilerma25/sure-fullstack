import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material/index";
import GppGoodIcon from "@mui/icons-material/GppGood";

const HeaderComponent: React.FC = () => {
  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <GppGoodIcon fontSize="medium" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Surely Reliable Insurance
          </Typography>
        </Toolbar>
      </AppBar>
    </header>
  );
};
export default HeaderComponent;
