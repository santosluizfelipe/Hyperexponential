import styled from "styled-components";

export const Strip = styled.section`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: 0 auto 20px;
  max-width: 1420px;
  @media (max-width: 1100px) { grid-template-columns: 1fr; }
`;

export const SummaryItem = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  display: flex;
  gap: 10px;
  min-height: 56px;
  padding: 12px 16px;
`;

export const Tooltip = styled.div`
  background: ${({ theme }) => theme.colors.text};
  border-radius: 6px;
  box-shadow: ${({ theme }) => theme.shadows.tooltip};
  color: ${({ theme }) => theme.colors.inverse};
  display: none;
  left: 0;
  max-height: 320px;
  overflow-y: auto;
  padding: 10px 12px;
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  z-index: 30;

  ul { display: grid; gap: 9px; list-style: none; margin: 0; padding: 0; }
  li { display: grid; gap: 2px; }
  li + li { border-top: 1px solid ${({ theme }) => theme.colors.inverseBorder}; padding-top: 9px; }
  strong, span, p { color: ${({ theme }) => theme.colors.inverse}; font-size: 12px; }
  span { color: ${({ theme }) => theme.colors.inverseMuted}; }
`;

export const WarningSummary = styled(SummaryItem)`
  cursor: default;
  outline: none;
  position: relative;

  &:focus-visible { border-color: ${({ theme }) => theme.colors.primary}; box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryFocus}; }
  &:hover ${Tooltip}, &:focus ${Tooltip} { display: block; }
`;
