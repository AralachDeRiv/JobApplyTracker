const handleErrors = (err) => {
  let errors = {};

  if (err.code == 11000) {
    errors.email = "This email already registered";
  }

  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  if (
    err.message.includes("user validation failed:") ||
    err.message.includes("job validation failed:")
  ) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports = { handleErrors };
