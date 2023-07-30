import { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, theme } from "../styles";
import "react-vis/dist/style.css";
import { ToastContainer } from "react-toastify";
import { MyContextProvider } from "../context/Boleto";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MyContextProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ToastContainer />
        <Component {...pageProps} />
      </ThemeProvider>
    </MyContextProvider>
  );
}
