import type { FC } from "react";

import { money } from "@/lib/format";
import type { EmployeeDetail } from "@/types/pay";
import { BandBlock, BandScale, EmptyState, Labels, Marker } from "@/components/BandMeter.styles";

type BandMeterProps = {
  employee: EmployeeDetail;
  proposedSalary?: number;
};

export const BandMeter: FC<BandMeterProps> = ({ employee, proposedSalary }) => {
  if (!employee.band || !employee.salary_position) {
    return <EmptyState>No matching current band. Treat salary guidance as incomplete.</EmptyState>;
  }

  const { band, salary_position: position } = employee;
  const proposedPercent = proposedSalary && band.max_salary !== band.min_salary
    ? Math.max(0, Math.min(100, ((proposedSalary - band.min_salary) / (band.max_salary - band.min_salary)) * 100))
    : null;
  const currentPercent = Math.max(0, Math.min(100, position.percentile ?? 0));

  return (
    <BandBlock>
      <BandScale aria-label="Salary band position">
        <Marker style={{ left: `${currentPercent}%` }} title="Current salary" />
        {proposedPercent !== null && (
          <Marker style={{ left: `${proposedPercent}%` }} className="proposed" title="Proposed salary" />
        )}
      </BandScale>
      <Labels>
        <span>{money(band.min_salary, employee.currency)}</span>
        <span>Mid {money(band.mid_salary, employee.currency)}</span>
        <span>{money(band.max_salary, employee.currency)}</span>
      </Labels>
      <Labels>
        <span>Status: {position.status.replace("_", " ")}</span>
        <span>Compa-ratio: {position.compa_ratio ?? "n/a"}</span>
      </Labels>
    </BandBlock>
  );
};
