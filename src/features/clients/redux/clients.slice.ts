import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { mapPagination } from "@app/helpers/table.helper";
import { TablePaginationDef } from "@app/types/pagination.types";

import { getClientByIdApi, getClientsApi } from "../api/clients.api";
import { CLIENTS_FEATURE_KEY } from "../constants/clients.keys";
import { Client, GetClientsParam } from "../types/clients.types";

interface SliceState {
  // Clients
  clients: Client[];
  isClientsLoading: boolean;
  pagination: TablePaginationDef;

  // Client
  client: Client | null;
  isClientLoading: boolean;
}

const initialState: SliceState = {
  // Clients
  clients: [],
  isClientsLoading: false,
  pagination: {
    current: 1,
    pageSize: 20,
    total: 0,
  },

  // Client
  client: null,
  isClientLoading: false,
};

export const getClients = createAsyncThunk(
  `${CLIENTS_FEATURE_KEY}/getClients`,
  async (params: GetClientsParam, { rejectWithValue }) => {
    try {
      const response = await getClientsApi(params);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getClientById = createAsyncThunk(
  `${CLIENTS_FEATURE_KEY}/getClientById`,
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await getClientByIdApi(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const clientsSlice = createSlice({
  name: CLIENTS_FEATURE_KEY,
  initialState,
  reducers: {
    clearClient: state => {
      state.client = null;
      state.isClientLoading = false;
    },
  },
  extraReducers: builder => {
    /** Get clients */
    builder.addCase(getClients.pending, state => {
      state.isClientsLoading = true;
    });
    builder.addCase(getClients.fulfilled, (state, action) => {
      state.isClientsLoading = false;
      state.clients = action.payload.data;
      state.pagination = mapPagination(action.payload.pagination);
    });
    builder.addCase(getClients.rejected, state => {
      state.isClientsLoading = false;
    });

    /** Get client by id */
    builder.addCase(getClientById.pending, state => {
      state.isClientLoading = true;
    });
    builder.addCase(getClientById.fulfilled, (state, action) => {
      state.isClientLoading = false;
      state.client = action.payload.data;
    });
    builder.addCase(getClientById.rejected, state => {
      state.isClientLoading = false;
    });
  },
});

export const { clearClient } = clientsSlice.actions;
export const clientsReducer = clientsSlice.reducer;
