type CamelKeyToSnake<T extends string, P extends string = ""> = string extends T
  ? string
  : T extends `${infer C0}${infer R}`
  ? CamelKeyToSnake<
      R,
      `${P}${C0 extends Lowercase<C0> ? "" : "_"}${Lowercase<C0>}`
    >
  : P;

export type CamelToSnake<T> = T extends Record<string, unknown>
  ? {
      [K in keyof T as CamelKeyToSnake<Extract<K, string>>]: CamelToSnake<T[K]>;
    }
  : T;
