import styled from "styled-components";

export const Disclosure = styled.section`
  margin-top: 24px;
`;

export const Toggle = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  justify-content: space-between;
  padding: 8px 0;
  width: 100%;
`;

export const Label = styled.span`
  align-items: center;
  display: inline-flex;
  font-size: 16px;
  font-weight: 700;
  gap: 8px;
`;

export const ToggleHint = styled.span`
  align-items: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: inline-flex;
  font-size: 13px;
  gap: 6px;
`;
