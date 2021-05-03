type ParseDef<T> = boolean | Array<keyof T>;

export interface ParseFiltersProps<T> {
  /**
   * Runs through the query string and parses string with boolean
   * values. If a boolean is passed, all strings with boolean values will
   * be parsed. If you want to specify which key / property to parse,
   * you can pass it an array of strings for keys, but you will also
   * need to pass a type containing the properties to the PageFilter.
   *
   * **Use when you have checkboxes, radio buttons, or switches.**
   */
  parseBoolean?: ParseDef<T>;
  /**
   * Runs through the query string and parses strings with date values.
   * If a boolean is passed, all strings and arrays with date values will be parsed.
   * If you want to specify which key / property to parse, you can pass
   * it an array of strings for keys, but you will also need to pass a
   * type containing the properties to the PageFilter.
   *
   * **Use this when using date pickers.**
   */
  parseDates?: ParseDef<T>;
  /**
   * Runs through the query string and parses strings with numbers.
   * If a boolean is passed, all strings and arrays with number values will be parsed.
   * If you want to specify which key / property to parse, you can
   * pass it an array of strings for keys, but you will also need
   * to pass a type containing the properties to the PageFilter.
   *
   * **Use when you have fields that contain numbers for values.**
   */
  parseNumbers?: ParseDef<T>;
}
