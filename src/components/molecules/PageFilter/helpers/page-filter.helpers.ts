/* eslint-disable @typescript-eslint/ban-types */
import moment from "moment";

import { stringIsNumber } from "@app/helpers/util.heplers";

import { ParseFiltersProps } from "../types/page-filter.types";

interface ParseFilterParams<T> extends ParseFiltersProps<T> {
  filters: Record<string, unknown>;
}

const isArrayIncludes = <T>(array: unknown, key: unknown) =>
  Array.isArray(array) && array.includes(key as keyof T);

export const parseFilters = <T>({
  filters,
  parseBoolean,
  parseDates,
  parseNumbers,
}: ParseFilterParams<T>) => {
  const parsedFilters: Record<string, unknown> = {};

  Object.entries(filters).forEach(([key, value]) => {
    let parsed = false;

    if (typeof value === "string") {
      if (
        parseBoolean &&
        (isArrayIncludes<T>(parseBoolean, key) ||
          value === "false" ||
          value === "true")
      ) {
        parsedFilters[key] = JSON.parse(value);
        parsed = true;
      } else if (
        parseNumbers &&
        stringIsNumber(value) &&
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
          if (stringIsNumber(item)) {
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
