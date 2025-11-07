import { useState, useCallback, useMemo } from 'react';
import { type Advocate } from '../../../../db/schema';

interface SearchFormProps {
  onSearch: (
    searchTerm: string,
    yearsOfExperience: string,
    degree: string,
    location: string,
    specialty: string,
  ) => void;
  advocates: Advocate[];
}

export default function SearchForm({ onSearch, advocates }: SearchFormProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [yearsOfExperience, setYearsOfExperience] = useState<string>('0');
  const [degree, setDegree] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [specialty, setSpecialty] = useState<string>('');

  const selectInputOptions = useMemo(() => {
    return {
      yearsOfExperience: Array.from(
        new Set(advocates.map((advocate) => advocate.yearsOfExperience)),
      ).sort((a, b) => a - b),
      degree: Array.from(
        new Set(advocates.map((advocate) => advocate.degree)),
      ).sort((a, b) => a.localeCompare(b)),
      specialty: Array.from(
        new Set(advocates.flatMap((advocate) => advocate.specialties)),
      ).sort((a, b) => a.localeCompare(b)),
      location: Array.from(
        new Set(advocates.map((advocate) => advocate.city)),
      ).sort((a, b) => a.localeCompare(b)),
    };
  }, [advocates]);

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onSearch(searchTerm, yearsOfExperience, degree, location, specialty);
  }, [onSearch, searchTerm, yearsOfExperience, degree, location, specialty]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onYearsOfExperienceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYearsOfExperience(e.target.selectedOptions[0].value);
  };

  const onDegreeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDegree(e.target.selectedOptions[0].value);
  };

  const onLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.selectedOptions[0].value);
  };

  const onSpecialtyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSpecialty(e.target.selectedOptions[0].value);
  };

  return (
    <div className="rounded-lg bg-[#fdfdfd] p-3 mt-6 shadow-lg w-full">
      <form onSubmit={onSubmit} className="flex flex-row flex-wrap">
        <div className="form-column">
          <label htmlFor="search-term">Search:</label>
          <input
            id="search-term"
            type="text"
            value={searchTerm}
            onChange={onInputChange}
            title="Search"
            placeholder="Search by any keyword"
            className="w-full"
          />
        </div>

        <div className="form-column split">
          <div className="split-form-input-container">
            <label htmlFor="years-of-experience">Years of Experience:</label>
            <select
              id="years-of-experience"
              value={yearsOfExperience}
              onChange={onYearsOfExperienceChange}
              title="Years of Experience"
            >
              <option value="0">Any</option>
              {selectInputOptions.yearsOfExperience.map((yearsOfExperience) => (
                <option key={yearsOfExperience} value={yearsOfExperience}>
                  {yearsOfExperience}
                </option>
              ))}
            </select>
          </div>

          <div className="split-form-input-container">
            <label htmlFor="degree">Degree:</label>
            <select
              id="degree"
              value={degree}
              onChange={onDegreeChange}
              title="Degree"
            >
              <option value="">Any</option>
              {selectInputOptions.degree.map((degree) => (
                <option key={degree} value={degree}>
                  {degree}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-column split">
          <div className="split-form-input-container">
            <label htmlFor="location">Location:</label>
            <select
              id="location"
              value={location}
              onChange={onLocationChange}
              title="Location"
            >
              <option value="">Any</option>
              {selectInputOptions.location.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div className="split-form-input-container">
            <label htmlFor="specialty">Specialty:</label>
            <select
              id="specialty"
              value={specialty}
              onChange={onSpecialtyChange}
              title="Specialty"
            >
              <option value="">Any</option>
              {selectInputOptions.specialty.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-column basis-full">
          <button
            type="submit"
            className="m-auto md:m-0 md:ml-auto mb-3 md:mb-0 mt-2 md:mt-0"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
