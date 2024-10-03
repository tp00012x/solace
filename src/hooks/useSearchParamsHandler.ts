import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useSearchParamsHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const updateQueryParams = (updatedParams: Record<string, any>) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    const newParams = new URLSearchParams(currentParams);

    Object.entries(updatedParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        newParams.set(key, value.toString());
      } else {
        newParams.delete(key);
      }
    });

    router.push(`${pathname}?${newParams.toString()}`);
  };

  const getParamValue = (key: string, defaultValue: string = "") => {
    const value = searchParams.get(key);
    return value !== null ? value : defaultValue;
  };

  return {
    getParamValue,
    updateQueryParams,
  };
}
