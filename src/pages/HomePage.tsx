import type { FC } from "react";

import { EmployeeDetailPanel } from "@/components/EmployeeDetailPanel";
import { ManagerHeader } from "@/components/ManagerHeader";
import { ProposalList } from "@/components/ProposalList";
import { SummaryStrip } from "@/components/SummaryStrip";
import { TeamTable } from "@/components/TeamTable";
import { usePayData } from "@/hooks/usePayData";
import { ErrorBanner, Layout, Page } from "@/pages/HomePage.styles";

export const HomePage: FC = () => {
  const {
    managers, managerEmail, team, selectedEmail, detail, proposals, levels, error,
    changeManager, setSelectedEmail
  } = usePayData();

  return (
    <Page>
      <ManagerHeader
        managers={managers}
        managerEmail={managerEmail}
        onManagerChange={changeManager}
      />
      {error && <ErrorBanner>{error}</ErrorBanner>}
      <SummaryStrip team={team} />
      <Layout>
        <TeamTable team={team} selectedEmail={selectedEmail} onSelect={setSelectedEmail} />
        <EmployeeDetailPanel
          detail={detail}
          managerEmail={managerEmail}
          levels={levels}
        />
      </Layout>
      <ProposalList proposals={proposals} />
    </Page>
  );
};
