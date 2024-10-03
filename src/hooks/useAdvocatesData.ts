import { useEffect, useState, useRef } from "react";
import { Advocate } from "@/app/api/advocates/route";

export default function useAdvocatesData(queryString: string) {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [allSpecialties, setAllSpecialties] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const prevQueryString = useRef<string | null>(null);

  useEffect(() => {
    if (prevQueryString.current === queryString) {
      return;
    }
    prevQueryString.current = queryString;

    const fetchAdvocates = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/advocates?${queryString}`);
        const advocatesData = await response.json();
        setAdvocates(advocatesData.data);
        setTotalPages(advocatesData.totalPages);
        setCurrentPage(advocatesData.currentPage);
        setAllSpecialties(advocatesData.allSpecialties);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdvocates();
  }, [queryString]);

  return { advocates, allSpecialties, isLoading, totalPages, currentPage };
}
