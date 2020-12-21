import { formValidators } from "types/form.types";

/**
 * Get appropriate error message
 * @param validatorName
 * @param validatorValue
 * @param customMessages
 */
const getValidationError = (
  validatorName: formValidators,
  validatorValue?: any,
  customMessages?: any
) => {
  const customMsg: any = customMessages !== undefined ? customMessages : {};
  const config: any = {
    email: customMsg.email ? customMsg.email : "Invalid email id",

    required: customMsg.required
      ? customMsg.required
      : "This field is required",

    min: customMsg.min
      ? customMsg.min
      : `Minimum value is ${validatorValue?.min}`,

    max: customMsg.max
      ? customMsg.max
      : `Maximum value is ${validatorValue?.max}`,

    pattern: customMsg.pattern ? customMsg.pattern : "Invalid pattern",
  };

  return config[validatorName];
};

export default getValidationError;
