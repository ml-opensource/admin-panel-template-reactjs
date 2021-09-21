import MockAdapter from "axios-mock-adapter";

import { api } from "./api";

export const mockApi = new MockAdapter(api, {
  onNoMatch: "passthrough",
});
