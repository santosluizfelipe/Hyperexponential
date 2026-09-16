import styled from "styled-components";

export const Form = styled.form`
  display: grid;
  gap: 12px;
  margin-top: 12px;
`;
export const Field = styled.label`
  display: grid;
  font-size: 13px;
  font-weight: 650;
  gap: 6px;
`;
export const CheckboxField = styled(Field)`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 10px;
  input { min-height: auto; }
`;
export const InlineWarning = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.colors.warningBackground};
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.warning};
  display: inline-flex;
  font-size: 13px;
  gap: 6px;
  padding: 7px 9px;
`;
export const FormStatus = styled.p`color: ${({ theme }) => theme.colors.textMuted}; font-size: 13px;`;
