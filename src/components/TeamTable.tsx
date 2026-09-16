import type { FC } from "react";

import { TeamSearch } from "@/components/TeamSearch";
import type { TeamEmployee } from "@/types/pay";
import { Heading, Section, Status, Table, TableWrap, WarningCount } from "@/components/TeamTable.styles";

type TeamTableProps = {
  team: TeamEmployee[];
  selectedEmail: string;
  onSelect: (email: string) => void;
};

export const TeamTable: FC<TeamTableProps> = ({ team, selectedEmail, onSelect }) => (
  <Section>
    <Heading>
      <h2>Team</h2>
      <span>Direct and indirect reports</span>
    </Heading>
    <TeamSearch team={team} onSelect={onSelect} />
    <TableWrap>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Team</th>
            <th>Band</th>
          </tr>
        </thead>
        <tbody>
          {team.map((employee) => (
            <tr
              key={employee.work_email}
              className={selectedEmail === employee.work_email ? "selected" : ""}
              onClick={() => onSelect(employee.work_email)}
            >
              <td>
                <strong>{employee.full_name}</strong>
                <span>
                  {employee.depth === 1 ? "Direct report" : `${employee.depth ?? "?"} levels down`}
                  {` · ${employee.location}`}
                </span>
              </td>
              <td>{employee.level}</td>
              <td>{employee.team}</td>
              <td>
                <Status className={employee.salary_position?.status ?? "missing"}>
                  {employee.salary_position?.status.replace("_", " ") ?? "missing band"}
                </Status>
                {employee.warnings.length > 0 && <WarningCount>{employee.warnings.length}</WarningCount>}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrap>
  </Section>
);
