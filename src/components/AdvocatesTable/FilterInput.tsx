import { Input } from "@/components/ui/input";
import { ChangeEvent, HTMLInputTypeAttribute } from "react";

interface IFilter {
  filterValue: string;
  onFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: HTMLInputTypeAttribute;
}

export default function FilterInput({
  filterValue,
  onFilterChange,
  placeholder,
  type,
}: IFilter) {
  return (
    <Input
      type={type}
      value={filterValue}
      onChange={onFilterChange}
      className="w-full sm:w-auto border-bright-blue text-light-bright-blue"
      placeholder={placeholder}
    />
  );
}
