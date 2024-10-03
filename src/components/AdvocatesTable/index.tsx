"use client";

import { useDebouncedCallback } from "use-debounce";
import SearchInput from "@/components/AdvocatesTable/SearchInput";
import Pagination from "@/components/AdvocatesTable/Pagination";
import FilterInput from "@/components/AdvocatesTable/FilterInput";
import TableView from "@/components/AdvocatesTable/TableView";
import useAdvocatesData from "@/hooks/useAdvocatesData";
import useAdvocateSearchParams from "@/hooks/useAdvocateSearchParams";
import { useState } from "react";
import DropdownMenuCheckboxes from "@/components/AdvocatesTable/SpecialtiesDropdown";
import Loader from "@/components/AdvocatesTable/Loader";

export default function AdvocatesTable() {
  const { queryParams, queryString, updateQueryParams } =
    useAdvocateSearchParams();
  const { search, specialties, page, city, degree, minExperience } =
    queryParams;
  const { advocates, allSpecialties, isLoading, totalPages, currentPage } =
    useAdvocatesData(queryString);

  const [searchInputValue, setSearchInputValue] = useState(search);
  const [cityInputValue, setCityInputValue] = useState(city);
  const [degreeInputValue, setDegreeInputValue] = useState(degree);
  const [minExperienceInputValue, setMinExperienceInputValue] =
    useState(minExperience);

  const debouncedUpdateSearch = useDebouncedCallback((value: string) => {
    updateQueryParams({ search: value, page: "1" });
  }, 300);

  const debouncedUpdateCity = useDebouncedCallback((value: string) => {
    updateQueryParams({ city: value, page: "1" });
  }, 300);

  const debouncedUpdateDegree = useDebouncedCallback((value: string) => {
    updateQueryParams({ degree: value, page: "1" });
  }, 300);

  const debouncedUpdateMinExperience = useDebouncedCallback((value: string) => {
    updateQueryParams({ minExperience: value, page: "1" });
  }, 300);

  const getSelectedSpecialties = () =>
    specialties ? specialties.split(";") : [];

  return (
    <>
      <SearchInput
        searchValue={searchInputValue}
        onSearchChange={(e) => {
          const value = e.target.value;
          setSearchInputValue(value);
          debouncedUpdateSearch(value);
        }}
        onClearClick={() => {
          updateQueryParams({ search: "", page: "1" });
          setSearchInputValue("");
        }}
        onResetClick={() => {
          updateQueryParams({
            search: "",
            city: "",
            degree: "",
            minExperience: "",
            specialties: "",
            page: "1",
          });
          setSearchInputValue("");
          setCityInputValue("");
          setDegreeInputValue("");
          setMinExperienceInputValue("");
        }}
      />
      <div className="flex flex-wrap gap-4">
        <FilterInput
          filterValue={cityInputValue}
          onFilterChange={(e) => {
            const value = e.target.value;
            setCityInputValue(value);
            debouncedUpdateCity(value);
          }}
          placeholder="Filter by city"
          type="text"
        />
        <FilterInput
          filterValue={degreeInputValue}
          onFilterChange={(e) => {
            const value = e.target.value;
            setDegreeInputValue(value);
            debouncedUpdateDegree(value);
          }}
          placeholder="Filter by degree"
          type="text"
        />
        <FilterInput
          filterValue={minExperienceInputValue}
          onFilterChange={(e) => {
            const value = e.target.value;
            setMinExperienceInputValue(value);
            debouncedUpdateMinExperience(value);
          }}
          placeholder="Minimum experience"
          type="number"
        />
        <DropdownMenuCheckboxes
          allSpecialties={allSpecialties}
          selectedSpecialties={getSelectedSpecialties()}
          onCheckedChange={(specialty) => {
            return () => {
              const selectedSpecialties = getSelectedSpecialties();
              let newOptions: string[];
              if (selectedSpecialties.includes(specialty)) {
                newOptions = selectedSpecialties.filter(
                  (opt) => opt !== specialty,
                );
              } else {
                newOptions = [...selectedSpecialties, specialty];
              }
              updateQueryParams({
                specialties: newOptions.join(";"),
                page: "1",
              });
            };
          }}
        />
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto h-2/3 bg-white rounded-2xl p-5">
          <TableView advocates={advocates} />
        </div>
      )}

      <Pagination
        onPrevious={() => {
          const newPage = Math.max(Number(page) - 1, 1).toString();
          updateQueryParams({ page: newPage });
        }}
        onNext={() => {
          const newPage = Math.min(Number(page) + 1, totalPages).toString();
          updateQueryParams({ page: newPage });
        }}
        currentPage={Number(currentPage)}
        totalPages={totalPages}
      />
    </>
  );
}
