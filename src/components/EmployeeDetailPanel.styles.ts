import styled from "styled-components";

export const Panel = styled.aside`
  background: ${({ theme }) => theme.colors.surface}; border: 1px solid ${({ theme }) => theme.colors.border}; border-radius: 8px; padding: 18px;
`;
export const Heading = styled.div`
  align-items: baseline; display: flex; gap: 12px; justify-content: space-between; margin-bottom: 14px;
  span { color: ${({ theme }) => theme.colors.textSecondary}; }
`;
export const FactGrid = styled.div`
  display: grid; gap: 10px; grid-template-columns: repeat(2, minmax(0, 1fr));
  > div { background: ${({ theme }) => theme.colors.page}; border: 1px solid ${({ theme }) => theme.colors.panelBorder}; border-radius: 6px; display: grid; gap: 4px; min-height: 72px; padding: 10px; }
  span { color: ${({ theme }) => theme.colors.textSecondary}; }
  strong { overflow-wrap: anywhere; }
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;
export const WarningList = styled.div`
  display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px;
`;
export const CleanBadge = styled.span`
  align-items: center; background: ${({ theme }) => theme.colors.successBackgroundSoft}; border-radius: 6px; color: ${({ theme }) => theme.colors.successStrong};
  display: inline-flex; font-size: 12px; gap: 6px; padding: 7px 9px;
`;
export const Subheading = styled.h3`
  align-items: center; display: flex; font-size: 16px; gap: 8px; margin-top: 24px;
`;
export const ProposalButton = styled.button`margin-top: 24px; width: 100%;`;
export const EmptyState = styled.div`
  background: ${({ theme }) => theme.colors.page}; border: 1px dashed ${({ theme }) => theme.colors.borderStrong}; border-radius: 6px;
  color: ${({ theme }) => theme.colors.textMuted}; padding: 14px;
`;
