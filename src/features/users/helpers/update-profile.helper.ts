import * as Yup from "yup";

import getValidationError from "helpers/forms/validation-error-helper";

import { UserInfo } from "../types/user.types";

const firstName = Yup.string().optional();

const lastName = Yup.string().optional();

const email = Yup.string().optional().email(getValidationError("email"));

const avatar = Yup.string().optional();

export const schema = Yup.object({
  firstName,
  lastName,
  email,
  avatar,
});

export const defaultUserInfo: UserInfo = {
  id: 0,
  color: "",
  name: "",
  // eslint-disable-next-line @typescript-eslint/camelcase
  pantone_value: "",
  year: 0,
};
