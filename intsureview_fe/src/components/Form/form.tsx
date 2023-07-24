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
import { validateName, validatePhoneNumber } from "../../utils/FormValidation";
import FormErrorSnackbar from "./FormErrorSnackbar";
import FormSuccessSnackbar from "./FormSuccessSnackbar";

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

  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCloseSnackbar = () => {
    setErrorSnackbarOpen(false);
    setSuccessSnackbarOpen(false);
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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { nameInput, phoneInput } = formData;

    const phoneError = validatePhoneNumber(phoneInput);
    setPhoneError(phoneError);

    const nameError = validateName(nameInput);
    setNameError(nameError);

    if (!phoneError && !nameError) {
      try {
        setLoading(true);
        const response = await postData(formData, setErrorSnackbarOpen);
        setLoading(false);
        if (response !== null) {
          setSuccessSnackbarOpen(true);
          resetForm();
        }
      } catch (error) {
        console.error("Error:", error);
        setErrorSnackbarOpen(true);
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

      <FormErrorSnackbar
        open={errorSnackbarOpen}
        onClose={handleCloseSnackbar}
      />
      <FormSuccessSnackbar
        open={successSnackbarOpen}
        onClose={handleCloseSnackbar}
      />
    </div>
  );
};

export default FormComponent;
