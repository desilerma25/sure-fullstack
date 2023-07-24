import React, { useState } from "react";
import "./Form.css";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { postData } from "../../api/formapi";
import {
  validateName,
  validatePhoneNumber,
  validateEmail,
} from "../../utils/FormValidation";
import FormSnackbar from "./FormSnackbar";

const FormComponent: React.FC = () => {
  const [formData, setFormData] = useState({
    nameInput: "",
    selectInput: "Yes",
    radioInput: "",
    phoneInput: "",
    emailInput: "",
  });

  const [phoneError, setPhoneError] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const resetForm = () => {
    setFormData({
      nameInput: "",
      selectInput: "Yes",
      radioInput: "",
      phoneInput: "",
      emailInput: "",
    });
  };

  const handleFormStateChange = (fieldName: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));

    if (fieldName === "phoneInput") {
      const phoneError = validatePhoneNumber(value);
      setPhoneError(phoneError);
    } else if (fieldName === "nameInput") {
      const nameError = validateName(value);
      setNameError(nameError);
    } else if (fieldName === "emailInput") {
      const emailError = validateEmail(value);
      setEmailError(emailError);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { nameInput, phoneInput, emailInput } = formData;

    const phoneError = validatePhoneNumber(phoneInput);
    setPhoneError(phoneError);

    const nameError = validateName(nameInput);
    setNameError(nameError);

    const emailError = validateEmail(emailInput);
    setEmailError(emailError);

    if (!phoneError && !nameError && !emailError) {
      try {
        setLoading(true);
        const response = await postData(formData, setSnackbarOpen);
        setLoading(false);
        if (response !== null) {
          setSnackbarOpen(true);
          setSnackbarMessage("Form submitted successfully!");
          resetForm();
        }
      } catch (error) {
        console.error("Error:", error);
        setSnackbarOpen(true);
        setSnackbarMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <TextField
          label="What is your first name?"
          value={formData.nameInput}
          onChange={(e) => handleFormStateChange("nameInput", e.target.value)}
          fullWidth
          margin="normal"
          error={!!nameError}
          helperText={nameError}
        />

        <FormControl fullWidth>
          <InputLabel>Do you like dogs?</InputLabel>
          <Select
            value={formData.selectInput}
            onChange={(e) =>
              handleFormStateChange("selectInput", e.target.value)
            }
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel id="demo-radio-buttons-group-label">
            Is it ever too early for Halloween?
          </FormLabel>
          <RadioGroup
            value={formData.radioInput}
            onChange={(e) =>
              handleFormStateChange("radioInput", e.target.value)
            }
          >
            <FormControlLabel value="never" control={<Radio />} label="Never" />
            <FormControlLabel
              value="always"
              control={<Radio />}
              label="Always"
            />
          </RadioGroup>
        </FormControl>

        <TextField
          label="Phone Number"
          value={formData.phoneInput}
          onChange={(e) => handleFormStateChange("phoneInput", e.target.value)}
          fullWidth
          margin="normal"
          error={!!phoneError}
          helperText={phoneError}
        />

        <TextField
          type="email"
          label="Email"
          value={formData.emailInput}
          onChange={(e) => handleFormStateChange("emailInput", e.target.value)}
          fullWidth
          margin="normal"
          error={!!emailError}
          helperText={emailError}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>

      <FormSnackbar
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </div>
  );
};

export default FormComponent;
