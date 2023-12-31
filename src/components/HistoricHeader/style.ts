import { styled } from "styled-components";
import { theme } from "../../styles";

export const Container = styled.div`
  width: 100%;
`;

export const Header = styled.header`
  padding: 4rem;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  width: 100%;
  background: linear-gradient(
    345deg,
    #00ff89,
    #00d775 6%,
    #00b061 16%,
    #008b4d 27%,
    #00673a 37%,
    #005632 47%,
    #00452a 57%,
    #003521 67%,
    #003020 77%,
    #002c1f 87%,
    #01271e 95%,
    #02231c
  );

  @media (max-width: 830px) {
    padding: 4rem 2rem;
    background: ${theme.colors.primary};
  }
`;

export const HeaderFirst = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  @media (max-width: 830px) {
    flex-direction: column;
    justify-content: center;
    gap: 4rem;
  }
`;

export const Menu = styled.menu`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;

  @media (max-width: 410px) {
    flex-direction: column;
  }
`;

export const MenuItem = styled.div<{ active?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.2rem 2.4rem;
  background: ${({ active }) =>
    active ? theme.colors.white12 : "transparent"};
  border-radius: 5rem;
  gap: 1.5rem;
  transition: 0.3s;

  svg {
    fill: ${theme.colors.white};
  }

  p {
    font-size: 1.6rem;
  }

  &:hover {
    transition: 0.3s;
    background-color: ${theme.colors.white12};
  }
`;

export const HeaderSecond = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-top: 6rem;
  margin-bottom: 4rem;

  @media (max-width: 830px) {
    margin-top: 0rem;
    margin-bottom: 4rem;
    flex-direction: column;
    text-align: center;
  }
`;

export const Title = styled.div`
  h2 {
    margin-bottom: 1rem;
    font-size: 4rem;
    font-weight: 500;
  }

  p {
    font-size: 2rem;
  }
`;

export const LastChecked = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;

  @media (max-width: 830px) {
    flex-direction: column;
    margin-top: 2rem;
    gap: 2rem;
  }
`;

export const LastCheckedText = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;

  p:first-child {
    font-size: 2rem;
  }

  p:last-child {
    font-size: 4rem;
  }
`;

export const LastCheckedButton = styled.div`
  cursor: pointer;
  background-color: "transparent";
  border: 0.3rem solid ${theme.colors.secondary};
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  gap: 1rem;
  border-radius: 5rem;
  transition: 0.3s;

  svg {
    transition: 0.3s;
    fill: ${theme.colors.secondary};
  }

  p {
    font-weight: 500;
    transition: 0.3s;
    color: ${theme.colors.secondary};
    font-size: 1.6rem;
  }

  &:hover {
    transition: 0.3s;
    background-color: ${theme.colors.secondary};
    svg {
      transition: 0.3s;
      fill: ${theme.colors.primary};
    }
    p {
      transition: 0.3s;
      color: ${theme.colors.primary};
    }
  }
`;

export const HeaderThird = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  p {
    font-size: 2rem;
  }

  div {
    cursor: pointer;
    background-color: "transparent";
    border: 0.2rem solid ${theme.colors.white};
    display: flex;
    align-items: center;
    padding: 0.7rem 1.4rem;
    gap: 1rem;
    border-radius: 5rem;
    transition: 0.3s;

    p {
      font-weight: 500;
      transition: 0.3s;
      color: ${theme.colors.white};
      font-size: 1.4rem;
    }

    &:hover {
      transition: 0.3s;
      background-color: ${theme.colors.white};

      p {
        transition: 0.3s;
        color: ${theme.colors.primary};
      }
    }
  }

  @media (max-width: 830px) {
    flex-direction: column;
    text-align: center;
  }
`;
