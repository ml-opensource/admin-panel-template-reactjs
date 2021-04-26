export type ParseDef<T> = boolean | Array<keyof T>;
export interface ParseFiltersProps<T> {
  /**
   * Runs through arrays in the query string and parses strings with date
   * values. Use this when using RangePicker. If a boolean is passed, all
   * arrays with date values will be parsed. If you want to specify which
   * key / property to parse, you can pass it an array of strings for keys,
   * but you will also need to pass a type containing the properties to the
   * PageFilter.
   */
  parseArrayDates?: ParseDef<T>;
  /**
   * Runs through arrays in the query string, and parses string
   * that contain numbers. Useful if you have a multi select, with
   * numbers for values. If a boolean is passed, all arrays with
   * date values will be parsed. If you want to specify which
   * key / property to parse, you can pass it an array of strings
   * for keys, but you will also need to pass a type containing
   * the properties to the PageFilter.
   */
  parseArrayNumbers?: ParseDef<T>;
  /**
   * Runs through the query string and parses string with boolean
   * values. Use when you have checkboxes, radio buttons, or switches.
   * If a boolean is passed, all arrays with date values will be parsed.
   * If you want to specify which key / property to parse, you can pass
   * it an array of strings for keys, but you will also need to pass a
   * type containing the properties to the PageFilter.
   */
  parseBoolean?: ParseDef<T>;
  /**
   * Runs through query string and parses strings with date values.
   * Use this when you date pickers. If a boolean is passed, all
   * arrays with date values will be parsed. If you want to specify which
   * key / property to parse, you can pass it an array of strings for keys,
   * but you will also need to pass a type containing the properties to the
   * PageFilter.
   */
  parseDates?: ParseDef<T>;
  /**
   * Runs through the query string and parses strings with numbers.
   * Use when you have fields that contain numbers for values. If a
   * boolean is passed, all arrays with date values will be parsed.
   * If you want to specify which key / property to parse, you can
   * pass it an array of strings for keys, but you will also need
   * to pass a type containing the properties to the PageFilter.
   */
  parseNumbers?: ParseDef<T>;
}
