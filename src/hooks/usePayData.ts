import { useCallback, useEffect, useState } from "react";

import {
  useGetEmployeeQuery,
  useGetLevelsQuery,
  useGetManagersQuery,
  useGetProposalsQuery,
  useGetTeamQuery
} from "@/api/payApi";

const queryOptions = { refetchOnFocus: true, refetchOnReconnect: true, refetchOnMountOrArgChange: true };

const errorMessage = (error: unknown): string | null => {
  if (!error) return null;
  if (typeof error === "object" && "data" in error) {
    const data = error.data;
    if (typeof data === "object" && data && "detail" in data && typeof data.detail === "string") return data.detail;
  }
  return "Unable to load the latest data.";
};

export const usePayData = () => {
  const [managerEmail, setManagerEmail] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const managersQuery = useGetManagersQuery(undefined, queryOptions);
  const levelsQuery = useGetLevelsQuery(undefined, queryOptions);
  const teamQuery = useGetTeamQuery(managerEmail, { ...queryOptions, skip: !managerEmail });
  const proposalsQuery = useGetProposalsQuery(managerEmail, { ...queryOptions, skip: !managerEmail });
  const detailQuery = useGetEmployeeQuery(
    { employeeEmail: selectedEmail, managerEmail },
    { ...queryOptions, skip: !selectedEmail || !managerEmail }
  );

  const managers = managersQuery.data ?? [];
  const team = teamQuery.data ?? [];

  useEffect(() => {
    if (managerEmail || managers.length === 0) return;
    const fromUrl = new URLSearchParams(window.location.search).get("manager");
    const initialManager = managers.find(({ work_email }) => work_email === fromUrl) ?? managers[0];
    setManagerEmail(initialManager.work_email);
  }, [managerEmail, managers]);

  useEffect(() => {
    if (!managerEmail || teamQuery.isFetching) return;
    setSelectedEmail((current) => team.some(({ work_email }) => work_email === current)
      ? current
      : team[0]?.work_email ?? "");
  }, [managerEmail, team, teamQuery.isFetching]);

  const changeManager = useCallback((nextEmail: string) => {
    setSelectedEmail("");
    setManagerEmail(nextEmail);
  }, []);

  const error = [managersQuery.error, levelsQuery.error, teamQuery.error, proposalsQuery.error, detailQuery.error]
    .map(errorMessage)
    .find(Boolean) ?? null;

  return {
    managers, managerEmail, team, selectedEmail,
    detail: detailQuery.data ?? null,
    proposals: proposalsQuery.data ?? [],
    levels: levelsQuery.data ?? [],
    error, changeManager, setSelectedEmail
  };
};
