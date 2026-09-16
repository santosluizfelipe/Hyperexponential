import styled from "styled-components";

export const EmptyState = styled.div`
  background: ${({ theme }) => theme.colors.page}; border: 1px dashed ${({ theme }) => theme.colors.borderStrong}; border-radius: 6px;
  color: ${({ theme }) => theme.colors.textMuted}; padding: 14px;
`;
export const BandBlock = styled.div`margin-top: 12px;`;
export const BandScale = styled.div`
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.bandMinimum}, ${({ theme }) => theme.colors.bandMidpoint}, ${({ theme }) => theme.colors.bandMaximum});
  border-radius: 999px; height: 14px; position: relative;
`;
export const Marker = styled.span`
  background: ${({ theme }) => theme.colors.text}; border: 2px solid ${({ theme }) => theme.colors.inverse}; border-radius: 999px;
  height: 22px; position: absolute; top: -4px; transform: translateX(-50%); width: 22px;
  &.proposed { background: ${({ theme }) => theme.colors.primary}; }
`;
export const Labels = styled.div`
  display: flex; font-size: 12px; justify-content: space-between; margin-top: 8px;
`;
