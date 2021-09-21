import { RouteItemDef } from "@app/types/route.types";

import { ClientsPathsEnum } from "../constants/clients.paths";
import ClientsScreen from "../screens/ClientsScreen/ClientsScreen";

const CLIENTS_SCREEN: RouteItemDef = {
  id: "clients",
  path: ClientsPathsEnum.CLIENTS,
  navigationTitle: "clients.navigationTitle",
  component: ClientsScreen,
};

export const CLIENTS_ROUTES = [CLIENTS_SCREEN];
