"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { type Advocate } from "../../../db/schema";
import SearchForm from "./components/SearchForm";
import LoadingImage from "../../../../public/loading.svg";
import AdvocatesList from "./components/AdvocatesList";

export default function Page() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<{
    searchTerm: string;
    yearsOfExperience: string;
    degree: string;
    location: string;
    specialty: string;
  }>({
    searchTerm: '',
    yearsOfExperience: '0',
    degree: '',
    location: '',
    specialty: '',
  });

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchAdvocates = async () => {
      if (!isMounted) return;
      setLoading(true);
      setError(null);

      try {

        console.log("fetching advocates...");
        const advocatesResponse = await fetch("/api/advocates", { signal });

        if (!advocatesResponse.ok) {
          throw new Error("Failed to fetch advocates");
        }

        const jsonResponse = await advocatesResponse.json();
        if (!isMounted) return;
        setAdvocates(jsonResponse.data);

      } catch (error) {

        if (!isMounted) return;
        console.error(error);
        setError("There was an error loading the advocates");

      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    fetchAdvocates();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const onChange = useCallback((searchTerm: string, yearsOfExperience: string, degree: string, location: string, specialty: string) => {
    setFilters({ ...filters, searchTerm, yearsOfExperience, degree, location, specialty });
  }, [filters]);

  const filteredAdvocates = useMemo(() => {
    return advocates.filter((advocate: Advocate) => {
      const searchTerm = filters.searchTerm.trim().toLowerCase();
      const searchKeywords = searchTerm.split(' ').map((keyword: string) => keyword.trim().toLowerCase());
      return (
        (searchTerm.length > 0 ? (
          (searchKeywords.some((keyword: string) => advocate.firstName.toLowerCase().startsWith(keyword))) ||
          (searchKeywords.some((keyword: string) => advocate.lastName.toLowerCase().startsWith(keyword))) ||
          (searchKeywords.some((keyword: string) => advocate.degree.toLowerCase().startsWith(keyword))) ||
          (searchKeywords.some((keyword: string) => advocate.specialties.find((specialty: string) => specialty.toLowerCase().includes(keyword))))
        ) : true) &&
        (advocate.yearsOfExperience >= parseInt(filters.yearsOfExperience, 10)) &&
        (filters.location.length > 0 ? advocate.city === filters.location : true) &&
        (filters.degree.length > 0 ? advocate.degree === filters.degree : true) &&
        (filters.specialty.length > 0 ? advocate.specialties.includes(filters.specialty) : true)
      );
    }).sort((a: Advocate, b: Advocate) => a.yearsOfExperience - b.yearsOfExperience);
  }, [filters.searchTerm, filters.yearsOfExperience, filters.degree, filters.location, filters.specialty, advocates]);

  if (loading || error) {
    return (
      <div className="page-container">
        <h1 className="text-white">Advocate Search</h1>
        <div className="mt-15 block w-full h-[30vh] flex flex-col justify-center items-center mt-15">
          {!error && <Image src={LoadingImage} alt="Loading" width={100} height={100} />}
          {error && <p className="text-center font-bold text-5xl">⚠️</p>}
          <p className="text-center text-white font-light mt-3">{error || "Loading advocates..."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="text-white">Advocate Search</h1>
      <SearchForm onSearch={onChange} advocates={advocates} />
      <h2 className="mt-5 text-white mr-auto">Search Results ({filteredAdvocates.length})</h2>
      <AdvocatesList advocates={filteredAdvocates} />
      {filteredAdvocates.length === 0 &&
        <p className="text-white text-center p-16">
          No results found. Please try again with different filters.
        </p>}
    </div>
  );
}
