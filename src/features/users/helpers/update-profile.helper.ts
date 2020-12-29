import * as Yup from "yup";

import getValidationError from "helpers/forms/validation-error-helper";

const firstName = Yup.string().required(getValidationError("required"));

const lastName = Yup.string().required(getValidationError("required"));

const email = Yup.string()
  .required(getValidationError("required"))
  .email(getValidationError("email"));

const avatar = Yup.string().required(getValidationError("required"));

export const schema = Yup.object({
  firstName,
  lastName,
  email,
  avatar,
});
