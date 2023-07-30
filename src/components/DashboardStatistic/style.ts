import { keyframes, styled } from "styled-components";
import { theme } from "../../styles";

export const Container = styled.div`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 12rem;
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
  margin-bottom: 5rem;
  gap: 3rem;

  @media (max-width: 470px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

export const Title = styled.p`
  font-size: 4rem;
  font-weight: 500;
`;

export const DropdownButtonContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const Button = styled.button`
  background-color: ${theme.colors.white};
  color: ${theme.colors.primary};
  font-size: 1.6rem;
  font-weight: 500;
  border: 0.2rem solid ${theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 10rem;
  padding: 1rem 2rem;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transition: 0.3s;
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export const Graphic = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Options = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

export const OptionItem = styled.div<{ color?: string; active?: string }>`
  font-size: 1.4rem;
  border: 0.3rem solid ${({ color }) => (color ? color : theme.colors.blue)};
  padding: 0.8rem 1.6rem;
  border-radius: 8rem;
  font-weight: 500;
  color: ${({ color }) => (color ? color : theme.colors.blue)};
  cursor: pointer;
  transition: 0.3s;

  ${({ active, color }) =>
    active
      ? `
    color: ${theme.colors.white};
    background: ${color ? color : theme.colors.blue};
    `
      : ""}

  &:hover {
    transition: 0.3s;
    color: ${theme.colors.white};
    background: ${({ color }) => (color ? color : theme.colors.blue)};
  }
`;

export const DropdownContentContainer = styled.div`
  position: absolute;
  background-color: ${theme.colors.white};
  min-width: 16rem;
  box-shadow: 0px 8px 10px 0px ${theme.colors.black10};
  z-index: 1;
  top: 5rem;
  text-align: center;
  border: 0.2rem solid ${theme.colors.primary};
  border-radius: 0.8rem;

  div {
    padding: 1rem 0;
    display: block;
    cursor: pointer;
    font-size: 1.6rem;
    border-bottom: 0.2rem solid;
    transition: 0.3s;

    &:hover {
      transition: 0.3s;
      background-color: rgba(0, 0, 0, 0.05);
    }

    &:last-child {
      border: none;
    }
  }
`;

export const Statistics = styled.div`
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
  gap: 2rem;

  h3 {
    font-size: 2.4rem;
    font-weight: 500;
  }

  div {
    min-width: 31rem;
    padding: 1.5rem;
    border-radius: 0.8rem;
    border: 0.2rem solid ${theme.colors.primary};
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    p {
      font-size: 1.6rem;
      &:first-child {
        font-size: 1.8rem;
        font-weight: 500;
      }
    }
  }
`;
