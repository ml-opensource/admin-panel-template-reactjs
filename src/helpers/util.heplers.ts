export const stringIsNumber = (value: unknown) => {
  return typeof value === "string" && !Number.isNaN(Number(value));
};
