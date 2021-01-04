import * as Yup from "yup";

import getValidationError from "helpers/forms/validation-error-helper";

const email = Yup.string()
  .required(getValidationError("required"))
  .email(getValidationError("email"));

const password = Yup.string().required(getValidationError("required"));

export const schema = Yup.object({
  email,
  password,
});

export const initFormValue = {
  email: "",
  password: "",
};
