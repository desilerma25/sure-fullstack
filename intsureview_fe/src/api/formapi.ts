const url: string = "http://127.0.0.1:8000/api/form/";

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

export const postData = async (
  formData: any,
  setErrorSnackbarOpen: Function,
) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      setErrorSnackbarOpen(true);
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    setErrorSnackbarOpen(true);
    return null;
  }
};
