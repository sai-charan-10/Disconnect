const RegisterValidation = (values) => {
    const errors = {};

    // Validate name field
    if (!values.name.trim()) {
        errors.name = "Name is required";
    }

    // Validate email field
    if (!values.email.trim()) {
        errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = "Invalid email format";
    }

    //validate phone number field
    if (!values.phoneNumber) {
        errors.phoneNumber = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(values.phoneNumber)) {
        errors.phoneNumber = "Invalid phone number format";
    }

    // Validate password field
    if (!values.password) {
        errors.password = "Password is required";
    } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/.test(values.password)) {
        errors.password = "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number";
    }

    return errors;
};

export default RegisterValidation;
