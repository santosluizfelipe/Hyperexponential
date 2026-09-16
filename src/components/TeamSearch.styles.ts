import styled from "styled-components";

export const SearchBox = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 14px;
  position: relative;

  > svg { color: ${({ theme }) => theme.colors.textSecondary}; left: 11px; pointer-events: none; position: absolute; }
  > input { padding-left: 38px; padding-right: 40px; width: 100%; }
`;

export const ClearButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  min-height: 32px;
  padding: 7px;
  position: absolute;
  right: 4px;
  width: 32px;
`;

export const Results = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: 6px;
  box-shadow: ${({ theme }) => theme.shadows.dropdown};
  left: 0;
  max-height: 320px;
  overflow-y: auto;
  position: absolute;
  right: 0;
  top: calc(100% + 4px);
  z-index: 20;

  button {
    align-items: start; background: ${({ theme }) => theme.colors.surface}; border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
    border-radius: 0; color: ${({ theme }) => theme.colors.text}; display: grid; gap: 2px;
    justify-content: stretch; padding: 10px 12px; text-align: left; width: 100%;
  }
  button:hover { background: ${({ theme }) => theme.colors.surfaceHover}; }
  span, p { color: ${({ theme }) => theme.colors.textSecondary}; font-size: 12px; }
  p { padding: 12px; }
`;
