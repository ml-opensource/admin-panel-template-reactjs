import React from "react";
import { RouteItemDef } from "types/routeDef";
import { PermissionEnum } from "features/permissions/permissions";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import { ExamplePathsEnum } from "../constants/example.paths";

const ExampleScreen = React.lazy(
  () => import("../screens/ExampleScreen/ExampleScreen")
);

const EXAMPLE_SCREEN: RouteItemDef = {
  path: ExamplePathsEnum.EXAMPLE,
  component: ExampleScreen,
  icon: LibraryBooksIcon,
  navigationTitle: "Example",
  pageTitle: "Example Page",
  permissions: [PermissionEnum.DASHBOARD],
};

export const EXAMPLE_ROUTES = [EXAMPLE_SCREEN];
