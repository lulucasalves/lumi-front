import { styled } from "styled-components";
import { theme } from "~/styles";

export const Container = styled.div`
  width: 100%;
  margin-top: 1rem;
`;

export const Send = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4rem;
`;

export const Title = styled.p`
  font-size: 4rem;
  font-weight: 500;
`;

export const SendButton = styled.div`
  cursor: pointer;

  background-color: "transparent";
  border: 0.3rem solid ${theme.colors.primary};
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  gap: 1rem;
  border-radius: 5rem;
  transition: 0.3s;

  svg {
    transition: 0.3s;
    fill: ${theme.colors.primary};
  }

  p {
    font-weight: 500;
    transition: 0.3s;
    color: ${theme.colors.primary};
    font-size: 1.6rem;
  }

  &:hover {
    transition: 0.3s;
    background-color: ${theme.colors.primary};
    svg {
      transition: 0.3s;
      fill: ${theme.colors.white};
    }
    p {
      transition: 0.3s;
      color: ${theme.colors.white};
    }
  }
`;
