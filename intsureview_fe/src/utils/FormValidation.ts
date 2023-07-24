export const validatePhoneNumber = (phoneInput: string) => {
  const phoneRegex = /^\d{10}$/;
  if (!phoneInput) {
    return "Please enter a phone number";
  } else if (!phoneRegex.test(phoneInput)) {
    return "Please enter a valid phone number with 10 digits.";
  } else {
    return "";
  }
};

export const validateName = (nameInput: string) => {
  const nameRegex = /^[A-Za-z]+$/;
  if (!nameInput) {
    return "Please enter a name";
  } else if (!nameRegex.test(nameInput)) {
    return "Please only enter letters";
  } else {
    return "";
  }
};
