import styled from "styled-components";

export const Page = styled.main`
  min-height: 100vh;
  padding: 24px;

  @media (max-width: 640px) { padding: 14px; }
`;

export const Layout = styled.div`
  align-items: start;
  display: grid;
  gap: 20px;
  grid-template-columns: minmax(640px, 1fr) minmax(400px, 520px);
  margin: 0 auto;
  max-width: 1420px;

  @media (max-width: 1100px) { grid-template-columns: 1fr; }
`;

export const ErrorBanner = styled.div`
  background: ${({ theme }) => theme.colors.page};
  border: 1px dashed ${({ theme }) => theme.colors.dangerBorder};
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.danger};
  margin: 0 auto 20px;
  max-width: 1420px;
  padding: 14px;
`;
