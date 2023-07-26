import { createGlobalStyle } from "styled-components";

import { theme } from "./theme";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${theme.fontFamily};
    font-weight: 400;
  }

  html {
    font-size: 62.5%;

    @media (max-width: 928px) {
      font-size: 55%;
    }
  }

  html,body {
    overflow-x: hidden;
  }
  
  input {
    ::-ms-reveal,
    ::-ms-clear {
      display: none;
    }
  }

  button {
    cursor: pointer;
    background: transparent;
    border: none;

    &:disabled {
      cursor: not-allowed;
    }
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }
`;
