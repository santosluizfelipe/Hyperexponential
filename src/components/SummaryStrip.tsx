import type { FC } from "react";
import { AlertTriangle, Users } from "lucide-react";

import type { TeamEmployee } from "@/types/pay";
import { Strip, SummaryItem, Tooltip, WarningSummary } from "@/components/SummaryStrip.styles";

type SummaryStripProps = {
  team: TeamEmployee[];
};

export const SummaryStrip: FC<SummaryStripProps> = ({ team }) => {
  const warningCount = team.reduce((total, employee) => total + employee.warnings.length, 0);
  const warnings = team.flatMap((employee) =>
    employee.warnings.map((warning) => ({
      key: `${employee.work_email}-${warning.code}-${warning.message}`,
      employeeName: employee.full_name,
      message: warning.message
    }))
  );

  return (
    <Strip>
      <SummaryItem>
        <Users size={18} />
        <span>{team.length} visible reports</span>
      </SummaryItem>
      <WarningSummary
        tabIndex={0}
        aria-describedby="warning-summary-tooltip"
      >
        <AlertTriangle size={18} />
        <span>{warningCount} data warnings</span>
        <Tooltip id="warning-summary-tooltip" role="tooltip">
          {warnings.length > 0 ? (
            <ul>
              {warnings.map((warning) => (
                <li key={warning.key}>
                  <strong>{warning.employeeName}</strong>
                  <span>{warning.message}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No data warnings for this team.</p>
          )}
        </Tooltip>
      </WarningSummary>
    </Strip>
  );
};
