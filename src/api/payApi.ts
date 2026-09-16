import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Employee, EmployeeDetail, Proposal, ProposalCreate, TeamEmployee } from "@/types/pay";

export const payApi = createApi({
  reducerPath: "payApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-cache");
      return headers;
    }
  }),
  keepUnusedDataFor: 0,
  tagTypes: ["Managers", "Levels", "Team", "Employee", "Proposal"],
  endpoints: (builder) => ({
    getManagers: builder.query<Employee[], void>({
      query: () => ({ url: "/managers", cache: "no-store" }),
      providesTags: ["Managers"]
    }),
    getLevels: builder.query<string[], void>({
      query: () => ({ url: "/levels", cache: "no-store" }),
      providesTags: ["Levels"]
    }),
    getTeam: builder.query<TeamEmployee[], string>({
      query: (managerEmail) => ({ url: "/team", params: { manager_email: managerEmail }, cache: "no-store" }),
      providesTags: (_result, _error, managerEmail) => [{ type: "Team", id: managerEmail }]
    }),
    getEmployee: builder.query<EmployeeDetail, { employeeEmail: string; managerEmail: string }>({
      query: ({ employeeEmail, managerEmail }) => ({
        url: `/employees/${encodeURIComponent(employeeEmail)}`,
        params: { manager_email: managerEmail },
        cache: "no-store"
      }),
      providesTags: (_result, _error, { employeeEmail }) => [{ type: "Employee", id: employeeEmail }]
    }),
    getProposals: builder.query<Proposal[], string>({
      query: (managerEmail) => ({ url: "/proposals", params: { manager_email: managerEmail }, cache: "no-store" }),
      providesTags: (_result, _error, managerEmail) => [{ type: "Proposal", id: managerEmail }]
    }),
    createProposal: builder.mutation<Proposal, ProposalCreate>({
      query: (proposal) => ({ url: "/proposals", method: "POST", body: proposal, cache: "no-store" }),
      invalidatesTags: (_result, _error, proposal) => [{ type: "Proposal", id: proposal.requester_email }]
    })
  })
});

export const {
  useGetManagersQuery,
  useGetLevelsQuery,
  useGetTeamQuery,
  useGetEmployeeQuery,
  useGetProposalsQuery,
  useCreateProposalMutation
} = payApi;
