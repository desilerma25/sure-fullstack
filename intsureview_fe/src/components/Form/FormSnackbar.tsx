import React from "react";
import { Snackbar } from "@mui/material";

type FormSnackbarProps = {
  open: boolean;
  onClose: () => void;
  message: string;
};

const FormSnackbar: React.FC<FormSnackbarProps> = ({
  open,
  onClose,
  message,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      message={message}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    />
  );
};

export default FormSnackbar;
