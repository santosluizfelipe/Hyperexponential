import styled from "styled-components";

export const Header = styled.header`
  align-items: end;
  display: flex;
  gap: 24px;
  justify-content: space-between;
  margin: 0 auto 20px;
  max-width: 1420px;

  p { color: ${({ theme }) => theme.colors.textSecondary}; }
  @media (max-width: 1100px) { align-items: stretch; flex-direction: column; }
`;

export const ManagerPicker = styled.label`
  display: grid;
  font-size: 13px;
  font-weight: 650;
  gap: 6px;
`;
