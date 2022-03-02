import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

export function createApiAsyncThunk<Result, Arg>(
  key: string,
  action: (arg: Arg) => Promise<AxiosResponse<Result>>
) {
  return createAsyncThunk<Result, Arg>(
    key,
    async (arg, { rejectWithValue }) => {
      try {
        const { data } = await action(arg);

        return data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
}
