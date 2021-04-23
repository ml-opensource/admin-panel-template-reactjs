/* eslint-disable @typescript-eslint/ban-types */
import { stringIsNumber } from "@app/helpers/util.heplers";

export type ParseDef<T> = boolean | Array<keyof T>;

interface ParseFilterParams<T> {
  filters: Record<string, unknown>;
  parseBoolean?: ParseDef<T>;
  parseNumbers?: ParseDef<T>;
  parseArrayNumbers?: ParseDef<T>;
}

const isArrayIncludes = <T>(array: unknown, key: unknown) =>
  Array.isArray(array) && array.includes(key as keyof T);

export const parseFilters = <T>({
  filters,
  parseArrayNumbers,
  parseBoolean,
  parseNumbers,
}: ParseFilterParams<T>) => {
  const parsedFilters: Record<string, unknown> = {};

  Object.entries(filters).forEach(([key, value]) => {
    let parsed = false;

    if (
      parseBoolean &&
      typeof value === "string" &&
      (isArrayIncludes<T>(parseBoolean, key) ||
        value === "false" ||
        value === "true")
    ) {
      parsedFilters[key] = JSON.parse(value);
      parsed = true;
    } else if (parseNumbers && stringIsNumber(value)) {
      if (
        isArrayIncludes<T>(parseNumbers, key) ||
        !Array.isArray(parseNumbers)
      ) {
        parsedFilters[key] = Number(value);
        parsed = true;
      }
    } else if (parseArrayNumbers && Array.isArray(value)) {
      if (
        isArrayIncludes<T>(parseArrayNumbers, key) ||
        !Array.isArray(parseArrayNumbers)
      ) {
        parsedFilters[key] = value.map(item => {
          if (stringIsNumber(item)) {
            return Number(item);
          }
          return item;
        });
        parsed = true;
      }
    }

    if (!parsed) {
      parsedFilters[key] = value;
    }
  });

  return parsedFilters;
};
