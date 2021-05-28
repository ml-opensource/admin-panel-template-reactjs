import _isFinite from "lodash/isFinite";

export const isValidUserId = (userId: string | number) => {
  return _isFinite(userId);
};
