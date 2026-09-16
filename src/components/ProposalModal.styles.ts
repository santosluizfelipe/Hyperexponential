import styled from "styled-components";

export const Backdrop = styled.div`
  align-items: center; background: ${({ theme }) => theme.colors.overlay}; display: flex; inset: 0;
  justify-content: center; padding: 20px; position: fixed; z-index: 1000;
`;
export const Modal = styled.section`
  background: ${({ theme }) => theme.colors.surface}; border-radius: 8px; box-shadow: ${({ theme }) => theme.shadows.modal};
  max-height: calc(100vh - 40px); max-width: 520px; overflow-y: auto; padding: 20px; width: 100%;
`;
export const Header = styled.header`
  align-items: start; border-bottom: 1px solid ${({ theme }) => theme.colors.borderSoft}; display: flex;
  justify-content: space-between; padding-bottom: 14px;
  p { color: ${({ theme }) => theme.colors.textSecondary}; margin-top: 3px; }
`;
export const CloseButton = styled.button`min-height: 36px; padding: 8px; width: 36px;`;
