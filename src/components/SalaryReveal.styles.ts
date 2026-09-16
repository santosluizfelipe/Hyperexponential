import styled from "styled-components";

export const SalaryRow = styled.div`
  align-items: center;
  display: flex !important;
  grid-template-columns: 1fr auto;
`;

export const SalaryValue = styled.strong`
  letter-spacing: 0;
`;

export const RevealButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  min-height: 34px;
  padding: 7px;
  width: 34px;
`;
