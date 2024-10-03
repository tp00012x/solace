import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface IPagination {
  onPrevious: () => void;
  onNext: () => void;
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  onPrevious,
  onNext,
  currentPage,
  totalPages,
}: IPagination) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevious}
          disabled={currentPage === 1}
          className="bg-bright-blue hover:bg-hover-green text-white hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="text-sm text-bright-blue">
          Page {currentPage} of {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="bg-bright-blue hover:bg-hover-green text-white hover:text-white"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
