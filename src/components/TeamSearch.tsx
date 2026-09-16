import { useMemo, useState } from "react";
import type { ChangeEvent, FC } from "react";
import { Search, X } from "lucide-react";

import type { TeamEmployee } from "@/types/pay";
import { ClearButton, Results, SearchBox } from "@/components/TeamSearch.styles";

type TeamSearchProps = {
  team: TeamEmployee[];
  onSelect: (email: string) => void;
};

export const TeamSearch: FC<TeamSearchProps> = ({ team, onSelect }) => {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const matches = useMemo(() => {
    if (!normalizedQuery) return [];
    return team
      .filter((employee) => [employee.full_name, employee.job_family, employee.team]
        .some((value) => value.toLocaleLowerCase().includes(normalizedQuery)))
      .slice(0, 8);
  }, [normalizedQuery, team]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value);

  const selectEmployee = (employee: TeamEmployee) => {
    onSelect(employee.work_email);
    setQuery("");
  };

  return (
    <SearchBox>
      <Search aria-hidden="true" size={18} />
      <input
        type="search"
        value={query}
        onChange={handleChange}
        placeholder="Search reports by name, role or team"
        aria-label="Search reports"
        aria-expanded={Boolean(normalizedQuery)}
        aria-controls="team-search-results"
      />
      {query && (
        <ClearButton type="button" onClick={() => setQuery("")} aria-label="Clear search">
          <X size={16} />
        </ClearButton>
      )}
      {normalizedQuery && (
        <Results id="team-search-results" role="listbox">
          {matches.map((employee) => (
            <button
              key={employee.work_email}
              type="button"
              role="option"
              onClick={() => selectEmployee(employee)}
            >
              <strong>{employee.full_name}</strong>
              <span>{employee.job_family} · {employee.team} · {employee.location}</span>
            </button>
          ))}
          {matches.length === 0 && <p>No reports found.</p>}
        </Results>
      )}
    </SearchBox>
  );
};
