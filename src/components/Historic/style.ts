import { styled } from "styled-components";
import { theme } from "~/styles";

export const Container = styled.div`
  width: 100%;
`;

export const LoaderDiv = styled.div`
  width: 100%;
  justify-content: center;
  margin-top: 5rem;
  display: flex;
  margin-bottom: 7rem;
`;

export const Content = styled.div`
  color: ${theme.colors.primary};
  padding: 4rem;
  margin-top: 1rem;
  margin-bottom: 12rem;

  table {
    width: 100%;
    text-align: center;
    font-size: 1.6rem;

    th {
      padding: 0.8rem;
      font-weight: 500;
    }

    tbody {
      tr:last-child {
        td {
          border: none;
        }
      }
    }

    td {
      padding: 0.5rem;
      border-bottom: 0.1rem solid rgba(0, 0, 0, 0.3);
      .payed {
        padding: 0.5rem 1rem;
        border: 0.1rem solid rgba(0, 0, 0, 0.5);
        border-radius: 0.5rem;

        &:hover {
          background-color: ${theme.colors.green};
          cursor: pointer;
          color: white;
        }
      }

      .no-payed {
        padding: 0.5rem 1rem;
        border: 0.1rem solid rgba(0, 0, 0, 0.5);
        border-radius: 0.5rem;

        &:hover {
          background-color: ${theme.colors.red};
          cursor: pointer;
          color: white;
        }
      }
      div {
        display: flex;
        align-items: center;
        gap: 2rem;

        div {
          svg {
            cursor: pointer;
            fill: ${theme.colors.primary};
          }
          &:last-child {
            svg {
              fill: ${theme.colors.red};
            }
          }
        }
      }
    }
  }
`;

export const Send = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5rem;
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
