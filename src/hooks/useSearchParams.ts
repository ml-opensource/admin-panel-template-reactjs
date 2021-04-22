/* eslint-disable @typescript-eslint/ban-types */
import { useCallback, useEffect, useState } from "react";

import _toInteger from "lodash/toInteger";
import qs from "query-string";
import { useLocation, useHistory } from "react-router-dom";

import { ItemModalEnum } from "@app/constants/route.constants";
import { getOrderByExtraction } from "@app/helpers/table.helper";
import { OrderByDef } from "@app/types/table.types";

/**
 * The reason for the generic type being wrapped in Partial,
 * is that we want to be able to update the search params one
 * parameter at a time. As we have no other way of forcing generics
 * passed to the hook to always have optional properties, we can wrap
 * it in Partial, and declare that we do not "care" if a property
 * in the generic type passed in contains a mandatory property.
 */
export type SearchParamDef<T = {}> = Partial<T> & {
  action?: ItemModalEnum;
  entryId?: string;
  entryType?: string;
  orderBy?: string;
  orderByExtracted?: OrderByDef;
  page?: number;
  pageSize?: number;
};

const useSearchParams = <T = {}>() => {
  const location = useLocation();
  const history = useHistory();

  const getCurrentSearch = useCallback(() => {
    const currentSearch = (qs.parse(
      location.search
    ) as SearchParamDef) as SearchParamDef<T>;
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
