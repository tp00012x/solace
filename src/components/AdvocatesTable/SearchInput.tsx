import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { ChangeEvent } from "react";

interface ISearch {
  searchValue: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClearClick: () => void;
  onResetClick: () => void;
}

export default function SearchInput({
  searchValue,
  onSearchChange,
  onClearClick,
  onResetClick,
}: ISearch) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-grow">
        <Input
          type="text"
          placeholder="Search advocates..."
          value={searchValue}
          onChange={onSearchChange}
          className="w-full border-bright-blue text-light-bright-blue"
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          onClick={onClearClick}
        >
          {searchValue ? (
            <X className="h-4 w-4 text-light-bright-blue hover:text-dark-green" />
          ) : (
            <Search className="h-4 w-4 text-light-bright-blue hover:text-dark-green" />
          )}
        </Button>
      </div>
      <Button
        onClick={onResetClick}
        className="bg-bright-blue hover:bg-hover-green"
      >
        Reset
      </Button>
    </div>
  );
}
