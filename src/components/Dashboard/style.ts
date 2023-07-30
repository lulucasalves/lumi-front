import { styled } from "styled-components";
import { theme } from "../../styles";

export const Container = styled.section`
  width: 100%;
`;

export const Content = styled.div`
  color: ${theme.colors.primary};
  padding: 4rem;

  @media (max-width: 830px) {
    padding: 4rem 2rem;
  }
`;
