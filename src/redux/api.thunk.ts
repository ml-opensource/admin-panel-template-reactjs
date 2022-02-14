import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

export function createApiAsyncThunk<Returned, Arg>(
  key: string,
  action: (arg: Arg) => Promise<AxiosResponse<Returned>>
) {
  return createAsyncThunk<Returned, Arg>(
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
