import type { FC } from "react";

import { money } from "@/lib/format";
import type { Proposal } from "@/types/pay";
import { EmptyState, Grid, Heading, Section } from "@/components/ProposalList.styles";

type ProposalListProps = {
  proposals: Proposal[];
};

export const ProposalList: FC<ProposalListProps> = ({ proposals }) => (
  <Section>
    <Heading>
      <h2>Submitted proposals</h2>
    </Heading>
    {proposals.length === 0 ? (
      <EmptyState>No proposals submitted by this manager yet.</EmptyState>
    ) : (
      <Grid>
        {proposals.map((proposal) => (
          <article key={proposal.id}>
            <div>
              <strong>{proposal.full_name}</strong>
              <span>{proposal.status}</span>
            </div>
            <p>
              {money(proposal.current_salary, proposal.currency)} to {money(proposal.new_salary, proposal.currency)}
              {proposal.new_level ? `, level ${proposal.current_level} to ${proposal.new_level}` : ""}
            </p>
            <small>Effective {proposal.effective_date}</small>
          </article>
        ))}
      </Grid>
    )}
  </Section>
);
