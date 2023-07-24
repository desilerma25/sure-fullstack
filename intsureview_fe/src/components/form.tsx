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

  const csrftoken: string | null = getCookie('csrftoken');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    validateName(nameInput);
    validatePhoneNumber(phoneInput);

     const formData = {nameInput, selectInput, radioInput, phoneInput, emailInput};

     async function postData(url: string, data: any, csrftoken: string | null) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken || '',
          },
          body: JSON.stringify(data),
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
    }

    const url = 'http://127.0.0.1:8000/api/form/';

    const response = await postData(url, formData, csrftoken);
    if (response !== null) {
      console.log(response);
    }
    //  await fetch('http://127.0.0.1:8000/api/form/', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'X-CSRFToken': csrftoken
    //   },
    //   body: JSON.stringify(formData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });

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

function getCookie(name: string): string | null {
  let cookieValue = '';
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export default FormComponent;