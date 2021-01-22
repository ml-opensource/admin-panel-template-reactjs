import { RouteGroupDef, RouteItemDef } from "@app/types/route.types";

export function flatten(items: Array<RouteItemDef | RouteGroupDef>) {
  const flat: RouteItemDef[] = [];

  items.forEach(item => {
    if (Array.isArray(item.nestedRoutes)) {
      flat.push(...flatten(item.nestedRoutes));
    } else {
      flat.push(item as RouteItemDef);
    }
  });

  return flat;
}
