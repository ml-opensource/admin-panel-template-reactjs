import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosPromise } from "axios";

export type ErrorType<Error> = AxiosError<Error>;

export const errorHandler = <TError = Error>(error: ErrorType<TError>) => {
  const { request, response } = error;
  if (response) {
    // process error to based on type
    const message = response.data;
    return message;
  }
  if (request) {
    // request sent but no response received
    return "network.noInternet";
  }
  // Something happened in setting up the request that triggered an Error
  return "network.unknown";
};

export function createApiAsyncThunk<Result, Arg>(
  key: string,
  action: (arg: Arg) => AxiosPromise<Result>
) {
  return createAsyncThunk<Result, Arg>(
    key,
    async (arg, { rejectWithValue }) => {
      try {
        const { data } = await action(arg);

        return data;
      } catch (error) {
        return rejectWithValue(errorHandler(error));
      }
    }
  );
}
