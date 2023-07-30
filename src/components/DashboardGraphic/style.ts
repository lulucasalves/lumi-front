import { styled } from "styled-components";
import { theme } from "~/styles";

export const Container = styled.div`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 7rem;
`;

export const LoaderDiv = styled.div`
  width: 100%;
  justify-content: center;
  margin-top: 1rem;
  display: flex;
  margin-bottom: 7rem;
`;

export const Send = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5rem;

  @media (max-width: 470px) {
    flex-direction: column;
    gap: 2rem;
  }
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

export const Stastitics = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 830px) {
    flex-direction: column;
  }
`;

export const Line = styled.div`
  width: 0.2rem;
  background-color: ${theme.colors.black10};
  height: 45rem;

  @media (max-width: 830px) {
    height: 0.2rem;
    width: 100%;
    margin: 2rem 0;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  h3 {
    font-size: 2.4rem;
    font-weight: 500;
    margin-bottom: 2rem;
  }

  table {
    font-size: 1.4rem;

    th {
      font-weight: 500;
      padding: 0.5rem 2rem;
    }

    tbody {
      tr {
        td {
          padding: 0.5rem 2rem;
          border-bottom: 1px solid ${theme.colors.black10};

          div {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
        }

        &:last-child {
          td {
            border: none;
          }
        }
      }
    }
  }
`;
