import { styled } from "styled-components";
import { theme } from "~/styles";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const Close = styled.div`
  cursor: pointer;
  position: absolute;
  top: 3rem;
  right: 3rem;
  svg {
    fill: ${theme.colors.primary};
  }
`;

export const ModalContent = styled.div`
  background-color: #fff;
  min-height: 30rem;
  position: relative;
  max-height: 50rem;
  padding: 3rem;
  overflow-y: scroll;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  h2 {
    font-size: 2rem;
    font-weight: 500;
  }

  div:last-child {
    margin-top: 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow-y: scroll;

    div {
      cursor: pointer;
      padding: 1rem;
      p {
        font-size: 1.6rem;
      }

      &:hover {
        background-color: ${theme.colors.black10};
      }
    }
  }
`;
