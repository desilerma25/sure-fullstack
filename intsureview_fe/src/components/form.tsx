import React, { useState } from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';


const FormComponent: React.FC = () => {
  // Form state
  const [nameInput, setNameInput] = useState('');
  const [selectInput, setSelectInput] = useState('Yes');
  const [radioInput, setRadioInput] = useState('option1');
  const [phoneInput, setPhoneInput] = useState('');
  const [emailInput, setEmailInput] = useState('');


  // Validation state
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');

const validatePhoneNumber = (phoneInput:string) => {
    const phoneRegex = /^\d{10}$/;
    if(!phoneInput) {
        setPhoneError('Please enter a phone number')
        return phoneError;
    } else if (!phoneRegex.test(phoneInput)) {
        setPhoneError('Please enter a valid phone number with 10 digits.')
        return phoneError;
    } else {
        setPhoneError('');
    }
}

const validateName = (nameInput:string) => {
    const nameRegex = /^[A-Za-z]+$/;
    if(!nameInput) {
        setNameError('Please enter a name')
        return nameError;
    } else if (!nameRegex.test(nameInput)) {
        setNameError('Please only enter letters')
        return nameError;
    } else {
        setNameError('');
    }
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    validateName(nameInput);
    validatePhoneNumber(phoneInput);
    // Circle back here w/ form submission logic here
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
        <Select value={selectInput} onChange={(e) => setSelectInput(e.target.value)}>
          <MenuItem value="Yes">Yes</MenuItem>
          <MenuItem value="No">No</MenuItem>
        </Select>
      </FormControl>

      <FormControl component="fieldset">
        <FormLabel id="demo-radio-buttons-group-label">Is it ever too early for Halloween?</FormLabel>
        <RadioGroup
          value={radioInput}
          onChange={(e) => setRadioInput(e.target.value)}
        >
          <FormControlLabel value="never" control={<Radio />} label="Never" />
          <FormControlLabel value="always" control={<Radio />} label="Always" />
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