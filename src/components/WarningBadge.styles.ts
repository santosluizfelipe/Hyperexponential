import styled from "styled-components";

export const Badge = styled.span`
  align-items: center;
  background: ${({ theme }) => theme.colors.warningBackground};
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.warning};
  display: inline-flex;
  font-size: 12px;
  gap: 6px;
  padding: 7px 9px;
  &.critical { background: ${({ theme }) => theme.colors.dangerBackground}; color: ${({ theme }) => theme.colors.danger}; }
`;
