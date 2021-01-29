import { SortOrder } from "antd/lib/table/interface";

export type OrderByDef = {
  key: string | undefined;
  direction: SortOrder | undefined;
};
