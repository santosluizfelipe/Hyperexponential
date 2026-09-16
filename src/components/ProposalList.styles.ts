import styled from "styled-components";

export const Section = styled.section`
  background: ${({ theme }) => theme.colors.surface}; border: 1px solid ${({ theme }) => theme.colors.border}; border-radius: 8px;
  margin: 20px auto 0; max-width: 1420px; padding: 18px;
`;
export const Heading = styled.div`
  align-items: baseline; display: flex; gap: 12px; justify-content: space-between; margin-bottom: 14px;
  span { color: ${({ theme }) => theme.colors.textSecondary}; }
`;
export const Grid = styled.div`
  display: grid; gap: 12px; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  article { border: 1px solid ${({ theme }) => theme.colors.borderSoft}; border-radius: 6px; padding: 12px; }
  article div { display: flex; justify-content: space-between; }
  article p { margin-top: 6px; }
  article span { background: ${({ theme }) => theme.colors.infoBackground}; border-radius: 999px; color: ${({ theme }) => theme.colors.info}; font-size: 12px; font-weight: 700; padding: 4px 8px; }
  small { color: ${({ theme }) => theme.colors.textSecondary}; }
`;
export const EmptyState = styled.div`
  background: ${({ theme }) => theme.colors.page}; border: 1px dashed ${({ theme }) => theme.colors.borderStrong}; border-radius: 6px;
  color: ${({ theme }) => theme.colors.textMuted}; padding: 14px;
`;
