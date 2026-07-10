//validate fields for registration form
  export const registerValidateField = (name, value) => {
    switch (name) {
      case "firstName":
        if (!value.trim()) return "First name is required.";
        if (value.trim().length < 2)
          return "First name must be at least 2 characters.";
        if (!/^[A-Za-z]+$/.test(value))
          return "Only letters are allowed";
        return "";

      case "lastName":
        if (!value.trim()) return "Last name is required.";
        if (!/^[A-Za-z]+$/.test(value))
          return "Only letters are allowed";
        return "";

      case "email":
        if (!value.trim()) return "Email is required.";
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
          return "Please enter a valid email address.";
        return "";

      case "phone":
        if (!value.trim()) return "Phone number is required.";
        if (!/^[0-9]{10}$/.test(value))
          return "Phone number must be 10 digits.";
        return "";

      case "country":
        if (!value) return "Please select a country.";
        return "";

      case "password":
        if (!value) return "Password is required.";
        if (value.length < 8)
          return "Password must be at least 8 characters.";
        return "";

      default:
        return "";
    }
  };



   //register form validation
  export const validateRegisterForm = (formData) => {
    const newErrors = {};

    // First Name checks whether firstName is empty (or contains only spaces)
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters.";

    }
    else if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      newErrors.firstName = "Only letters are allowed";
    }

    // Last Name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    } else if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      newErrors.lastName = "Only letters are allowed";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    // Country
    if (!formData.country) {
      newErrors.country = "Please select a country.";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    // else if (
    //   !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/.test(formData.password)
    // ) {
    //   newErrors.password =
    //     "Password must contain uppercase, lowercase, number and special character.";
    // }

    return newErrors;
  };