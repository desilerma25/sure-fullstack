import React, { useState } from "react";
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
import { 
  postData, 
  validateName, 
  validatePhoneNumber 
} from "../api/formapi";

const FormComponent: React.FC = () => {


  // Form state
  const [nameInput, setNameInput] = useState<string>("");
  const [selectInput, setSelectInput] = useState<string>("Yes");
  const [radioInput, setRadioInput] = useState<string>("");
  const [phoneInput, setPhoneInput] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");

  // Validation state
  const [phoneError, setPhoneError] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneError = validatePhoneNumber(phoneInput);
    setPhoneError(phoneError);

    const nameError = validateName(nameInput);
    setNameError(nameError);

    if (!phoneError && !nameError) {
      const formData = {
        nameInput,
        selectInput,
        radioInput,
        phoneInput,
        emailInput,
      };

      const response = await postData(formData);
      if (response !== null) {
        console.log(response);
      }
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <TextField
          label="What is your first name?"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          fullWidth
          margin="normal"
          error={!!nameError}
          helperText={nameError}
        />

        <FormControl fullWidth>
          <InputLabel>Do you like dogs?</InputLabel>
          <Select
            value={selectInput}
            onChange={(e) => setSelectInput(e.target.value)}
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
            value={radioInput}
            onChange={(e) => setRadioInput(e.target.value)}
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
          value={phoneInput}
          onChange={(e) => setPhoneInput(e.target.value)}
          fullWidth
          margin="normal"
          error={!!phoneError}
          helperText={phoneError}
        />

        <TextField
          type="email"
          label="Email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default FormComponent;
