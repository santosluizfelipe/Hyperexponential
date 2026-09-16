import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.page};
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    line-height: 1.4;
  }

  * { box-sizing: border-box; }
  body { margin: 0; }
  h1, h2, h3, p { margin: 0; }
  h1 { font-size: 32px; font-weight: 720; }
  h2 { font-size: 20px; }
  button, input, select, textarea { font: inherit; }

  button {
    align-items: center;
    background: ${({ theme }) => theme.colors.text};
    border: 0;
    border-radius: 6px;
    color: ${({ theme }) => theme.colors.inverse};
    cursor: pointer;
    display: inline-flex;
    gap: 8px;
    justify-content: center;
    min-height: 42px;
    padding: 9px 12px;
  }

  select, input, textarea {
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.borderStrong};
    border-radius: 6px;
    color: ${({ theme }) => theme.colors.text};
    min-height: 40px;
    padding: 8px 10px;
  }

  textarea { min-height: 88px; resize: vertical; }
`;
