import styled from "styled-components";

export const Section = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 18px;
`;

export const Heading = styled.div`
  align-items: baseline;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  margin-bottom: 14px;
  span { color: ${({ theme }) => theme.colors.textSecondary}; }
`;

export const TableWrap = styled.div`overflow-x: auto;`;

export const Table = styled.table`
  border-collapse: collapse;
  min-width: 760px;
  width: 100%;

  th { color: ${({ theme }) => theme.colors.textMuted}; font-size: 12px; text-align: left; text-transform: uppercase; }
  th, td { border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle}; padding: 11px 8px; }
  tbody tr { cursor: pointer; }
  tbody tr:hover, tbody tr.selected { background: ${({ theme }) => theme.colors.surfaceHover}; }
  td strong, td span { display: block; }
  td span { color: ${({ theme }) => theme.colors.textSecondary}; }
`;

export const Status = styled.span`
  border-radius: 999px;
  display: inline-flex !important;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 8px;
  text-transform: capitalize;

  &.within_band { background: ${({ theme }) => theme.colors.successBackground}; color: ${({ theme }) => theme.colors.success}; }
  &.below_band, &.above_band, &.missing { background: ${({ theme }) => theme.colors.warningBackgroundSoft}; color: ${({ theme }) => theme.colors.warningStrong}; }
`;

export const WarningCount = styled.span`
  background: ${({ theme }) => theme.colors.dangerStrong};
  border-radius: 999px;
  color: ${({ theme }) => theme.colors.inverse} !important;
  display: inline-grid !important;
  font-size: 11px;
  height: 20px;
  margin-left: 6px;
  place-items: center;
  width: 20px;
`;
