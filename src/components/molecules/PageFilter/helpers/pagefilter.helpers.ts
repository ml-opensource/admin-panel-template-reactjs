/* eslint-disable @typescript-eslint/ban-types */
import { stringIsNumber } from "@app/helpers/util.heplers";

export type ParseDef<T> = boolean | Array<keyof T>;

interface ParseFilterParams<T> {
  filters: Record<string, unknown>;
  parseBoolean?: ParseDef<T>;
  parseNumbers?: ParseDef<T>;
  parseArrayNumbers?: ParseDef<T>;
}

export const parseFilters = <T extends {}>({
  filters,
  parseArrayNumbers,
  parseBoolean,
  parseNumbers,
}: ParseFilterParams<T>) => {
  const parsedFilters: Record<string, unknown> = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (
      parseBoolean &&
      typeof value === "string" &&
      ((Array.isArray(parseBoolean) && parseBoolean.includes(key as keyof T)) ||
        value === "false" ||
        value === "true")
    ) {
      parsedFilters[key] = JSON.parse(value);
    } else if (parseNumbers && stringIsNumber(value)) {
      parsedFilters[key] = Number(value);
    } else if (parseArrayNumbers && Array.isArray(value)) {
      parsedFilters[key] = value.map(item => {
        if (stringIsNumber(value)) {
          return Number(item);
        }
        return item;
      });
    } else {
      parsedFilters[key] = value;
    }
  });

  return parsedFilters;
};
