import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useSearchParamsHandler from "@/hooks/useSearchParamsHandler";

interface QueryParams {
  search: string;
  page: string;
  specialties: string;
  city: string;
  degree: string;
  minExperience: string;
  pageSize: string;
}

const paramDefaults: QueryParams = {
  search: "",
  page: "1",
  specialties: "",
  city: "",
  degree: "",
  minExperience: "",
  pageSize: "10",
};

function createQueryString(params: Partial<QueryParams>): string {
  const urlParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value) {
      urlParams.set(key, value);
    }
  }

  return urlParams.toString();
}

export default function useAdvocateSearchParams() {
  const { getParamValue, updateQueryParams } = useSearchParamsHandler();
  const searchParams = useSearchParams();

  const queryParams: QueryParams = Object.keys(paramDefaults).reduce(
    (params, key) => {
      params[key as keyof QueryParams] = getParamValue(
        key,
        paramDefaults[key as keyof QueryParams],
      );
      return params;
    },
    {} as QueryParams,
  );

  const queryString = createQueryString(queryParams);

  useEffect(() => {
    if (!searchParams.has("page")) {
      updateQueryParams({ page: "1" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { queryParams, queryString, updateQueryParams };
}
