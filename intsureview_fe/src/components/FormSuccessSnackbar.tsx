import React from "react";
import { Snackbar } from "@mui/material";

type FormSuccessSnackbarProps = {
  open: boolean;
  onClose: () => void;
};

const FormSuccessSnackbar: React.FC<FormSuccessSnackbarProps> = ({
  open,
  onClose,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      message="Form submitted successfully!"
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    />
  );
};

export default FormSuccessSnackbar;
