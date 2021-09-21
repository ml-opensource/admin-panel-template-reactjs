import { get, camelCase, snakeCase } from "lodash";

// check if data is array
export const isArray = <T>(d: T): boolean => Array.isArray(d);

// check if data is object
export const isObject = <T>(d: T): boolean =>
  d === Object(d) && !isArray(d) && typeof d !== "function";

// convert object keys to camelCase
export function toCamel<T extends unknown>(d: T): T | Record<string, unknown> {
  if (isObject(d)) {
    const o: Record<string, unknown> = {};
    Object.keys(d as Record<string, unknown>).forEach(k => {
      o[camelCase(k)] = toCamel(get(d, k) as T);
    });

    return o;
  }
  if (isArray(d)) {
    return (d as Array<unknown>).map((o: unknown) => toCamel(o)) as T;
  }

  return d;
}

// convert object keys to snake_case
export function toSnakeCase<T extends unknown>(
  d: T,
  filter = false
): T | Record<string, unknown> | undefined {
  if (isObject(d)) {
    const o: Record<string, unknown> = {};
    Object.keys(d as Record<string, unknown>).forEach(k => {
      o[snakeCase(k)] = toSnakeCase(get(d, k) as T, filter);
    });

    return o;
  }
  if (isArray(d)) {
    return (d as Array<unknown>).map((o: unknown) =>
      toSnakeCase(o, filter)
    ) as T;
  }

  if (filter && d === "") {
    return undefined;
  }

  return d;
}

export const flatObject = (
  value: Record<string, unknown>,
  currentKey?: unknown
): Record<string, unknown> => {
  let result: Record<string, unknown> = {};

  Object.keys(value).forEach(key => {
    const tempKey = currentKey ? `${currentKey}.${key}` : key;

    if (typeof value[key] !== "object") {
      result[tempKey] = value[key];
    } else {
      result = {
        ...result,
        ...flatObject(value[key] as Record<string, unknown>, tempKey),
      };
    }
  });

  return result;
};
