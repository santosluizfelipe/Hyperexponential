import { useEffect, useState } from "react";
import type { FC } from "react";
import { CheckCircle2, FilePlus2 } from "lucide-react";

import { BandDisclosure } from "@/components/BandDisclosure";
import { PerformanceHistory } from "@/components/PerformanceHistory";
import { ProposalModal } from "@/components/ProposalModal";
import { WarningBadge } from "@/components/WarningBadge";
import { SalaryReveal } from "@/components/SalaryReveal";
import type { EmployeeDetail } from "@/types/pay";
import {
  CleanBadge, EmptyState, FactGrid, Heading, Panel, ProposalButton, Subheading, WarningList
} from "@/components/EmployeeDetailPanel.styles";

type EmployeeDetailPanelProps = {
  detail: EmployeeDetail | null;
  managerEmail: string;
  levels: string[];
};

export const EmployeeDetailPanel: FC<EmployeeDetailPanelProps> = ({
  detail,
  managerEmail,
  levels
}) => {
  const [isProposalOpen, setIsProposalOpen] = useState(false);

  useEffect(() => setIsProposalOpen(false), [detail?.work_email]);

  return (
    <Panel>
    {detail ? (
      <>
        <Heading>
          <h2>{detail.full_name}</h2>
          <span>{detail.job_family} · {detail.level}</span>
        </Heading>
        <FactGrid>
          <div>
            <span>Current salary</span>
            <SalaryReveal amount={detail.salary} currency={detail.currency} employeeEmail={detail.work_email} />
          </div>
          <div><span>Region</span><strong>{detail.region ?? "Unknown"}</strong></div>
          <div><span>Start date</span><strong>{detail.start_date}</strong></div>
          <div><span>Manager</span><strong>{detail.manager_email ?? "None"}</strong></div>
        </FactGrid>
        <WarningList>
          {detail.warnings.map((warning) => (
            <WarningBadge key={`${warning.code}-${warning.message}`} warning={warning} />
          ))}
          {detail.warnings.length === 0 && (
            <CleanBadge><CheckCircle2 size={14} />No data warnings</CleanBadge>
          )}
        </WarningList>
        <BandDisclosure employee={detail} />
        <Subheading>Performance history</Subheading>
        <PerformanceHistory reviews={detail.performance_reviews} />
        <ProposalButton type="button" onClick={() => setIsProposalOpen(true)}>
          <FilePlus2 size={18} />
          Create proposal
        </ProposalButton>
        {isProposalOpen && (
          <ProposalModal
            employee={detail}
            managerEmail={managerEmail}
            levels={levels}
            onClose={() => setIsProposalOpen(false)}
          />
        )}
      </>
    ) : (
      <EmptyState>Select a report to inspect pay context.</EmptyState>
    )}
    </Panel>
  );
};
