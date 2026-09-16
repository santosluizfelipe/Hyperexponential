import styled from "styled-components";

export const ReviewList = styled.div`
  display: grid; gap: 10px; margin-top: 10px;
  article { border: 1px solid ${({ theme }) => theme.colors.borderSoft}; border-radius: 6px; padding: 12px; }
  article div { display: flex; justify-content: space-between; }
  article p { margin-top: 6px; }
`;
export const EmptyState = styled.div`
  background: ${({ theme }) => theme.colors.page}; border: 1px dashed ${({ theme }) => theme.colors.borderStrong}; border-radius: 6px;
  color: ${({ theme }) => theme.colors.textMuted}; padding: 14px;
`;
