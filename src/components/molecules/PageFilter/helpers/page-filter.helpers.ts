/* eslint-disable @typescript-eslint/ban-types */
import moment from "moment";

import { ParseFiltersProps } from "../types/page-filter.types";

interface ParseFilterParams<T> extends ParseFiltersProps<T> {
  filters: Record<string, unknown>;
}

// Check if value is array and includes key
const isArrayIncludes = <T>(value: unknown, key: unknown) =>
  Array.isArray(value) && value.includes(key as keyof T);

// Check if value is string and can be converted to valid number
const isStringNumber = (value: unknown) =>
  typeof value === "string" && !Number.isNaN(Number(value));

export const parseFilters = <T>({
  filters,
  parseDates,
  parseNumbers,
}: ParseFilterParams<T>) => {
  const parsedFilters: Record<string, unknown> = {};

  Object.entries(filters).forEach(([key, value]) => {
    let parsed = false;

    if (typeof value === "string") {
      if (
        parseNumbers &&
        isStringNumber(value) &&
        (isArrayIncludes<T>(parseNumbers, key) || !Array.isArray(parseNumbers))
      ) {
        parsedFilters[key] = Number(value);
        parsed = true;
      } else if (
        parseDates &&
        moment(value).isValid() &&
        (isArrayIncludes<T>(parseDates, key) || !Array.isArray(parseDates))
      ) {
        parsedFilters[key] = moment(value);
        parsed = true;
      }
    } else if (Array.isArray(value)) {
      if (
        parseNumbers &&
        (isArrayIncludes<T>(parseNumbers, key) || !Array.isArray(parseNumbers))
      ) {
        parsedFilters[key] = value.map(item => {
          if (isStringNumber(item)) {
            parsed = true;
            return Number(item);
          }
          return item;
        });
      }

      if (
        parseDates &&
        (isArrayIncludes<T>(parseDates, key) || !Array.isArray(parseDates)) &&
        !parsed
      ) {
        parsedFilters[key] = value.map(item => {
          if (moment(item).isValid()) {
            parsed = true;
            return moment(item);
          }
          return item;
        });
      }
    }

    if (!parsed) {
      parsedFilters[key] = value;
    }
  });

  return parsedFilters;
};
