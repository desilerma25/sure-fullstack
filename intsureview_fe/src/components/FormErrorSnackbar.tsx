import React from "react";
import { Snackbar } from "@mui/material";

type FormErrorSnackbarProps = {
  open: boolean;
  onClose: () => void;
};

const FormErrorSnackbar: React.FC<FormErrorSnackbarProps> = ({
  open,
  onClose,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      message="An error occurred. Please try again later."
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    />
  );
};

export default FormErrorSnackbar;
