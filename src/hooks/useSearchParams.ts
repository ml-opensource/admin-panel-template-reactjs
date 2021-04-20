import { useCallback, useEffect, useState } from "react";

import _toInteger from "lodash/toInteger";
import qs from "query-string";
import { useLocation, useHistory } from "react-router-dom";

import { ItemModalEnum } from "@app/constants/route.constants";
import { getOrderByExtraction } from "@app/helpers/table.helper";
import { OrderByDef } from "@app/types/table.types";

export type SearchParamDef<T = Record<string, unknown>> = T & {
  action?: ItemModalEnum;
  entryId?: string;
  entryType?: string;
  orderBy?: string;
  orderByExtracted?: OrderByDef;
  page?: number;
  pageSize?: number;
};

const useSearchParams = <T = Record<string, unknown>>() => {
  const location = useLocation();
  const history = useHistory();

  const getCurrentSearch = useCallback(() => {
    const currentSearch = (qs.parse(
      location.search
    ) as unknown) as SearchParamDef<T>;
    currentSearch.orderByExtracted = getOrderByExtraction(
      (currentSearch.orderBy as string) || ""
    );
    currentSearch.page = _toInteger(currentSearch.page) || 1;
    currentSearch.pageSize = _toInteger(currentSearch.pageSize) || undefined;
    return currentSearch;
  }, [location.search]);

  const [search, setSearch] = useState<SearchParamDef<T>>(getCurrentSearch());

  useEffect(() => {
    setSearch(getCurrentSearch());
  }, [getCurrentSearch]);

  /**
   * get direction if order by key is present in search params
   */
  const getOrderByDirection = useCallback(
    (orderByKey: string) => {
      return (
        (search?.orderByExtracted?.key === orderByKey &&
          search?.orderByExtracted?.direction) ||
        undefined
      );
    },
    [search]
  );

  /**
   * Clear search params with new params
   */
  const setSearchParams = useCallback(
    (filters: SearchParamDef<T>) => {
      history.push({
        pathname: location.pathname,
        search: qs.stringify(filters, { skipEmptyString: true }),
      });
    },
    [history, location.pathname]
  );

  /**
   * Update existing search params with new params
   */
  const updateSearchParams = useCallback(
    (filters: SearchParamDef<T>) => {
      // Keep current search params
      const currentSearch = qs.parse(location.search);

      history.push({
        pathname: location.pathname,
        search: qs.stringify(
          {
            ...currentSearch,
            ...filters,
          },
          { skipEmptyString: true }
        ),
      });
    },
    [history, location.pathname, location.search]
  );

  return {
    search,
    setSearchParams,
    updateSearchParams,
    getOrderByDirection,
  };
};

export default useSearchParams;
