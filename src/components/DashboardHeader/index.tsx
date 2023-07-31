import Image from "next/image";
import {
  Container,
  Header,
  HeaderFirst,
  HeaderSecond,
  HeaderThird,
  LastChecked,
  LastCheckedButton,
  LastCheckedText,
  Menu,
  MenuItem,
  Title,
} from "./style";
import { BsDownload, BsGraphUp, BsListCheck } from "react-icons/bs";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { IContext, MyContext } from "../../context/Boleto";
import { ucList } from "../../client/boletos";
import { Modal } from "../Modal";
import { Loader } from "../Loader";
import { toastrError } from "../../features/toastr";

export function DashboardHeader() {
  const { currentUc, ucs, setCurrentUc, year, setYear } =
    useContext<IContext>(MyContext);
  const [last, setLast] = useState({ value: "", url: "" });
  const [modalUc, setModalUc] = useState(false);
  const [modalYear, setModalYear] = useState(false);

  function ordenarPorDataEmissao(listaDeObjetos) {
    const convertToDate = (dateStr) => {
      const [day, month, year] = dateStr.split("/").map(Number);
      return new Date(year, month - 1, day);
    };

    const sortedList = listaDeObjetos.sort((a, b) => {
      const dateA = convertToDate(a.dataEmissao);
      const dateB = convertToDate(b.dataEmissao);
      return dateA - dateB;
    });

    return sortedList.reverse();
  }
  useEffect(() => {
    (async () => {
      if (currentUc) {
        const [, numberUc] = currentUc.split(" - ");

        await ucList(numberUc).then((val) => {
          if (val.message) toastrError(val.message);
          else {
            const value = ordenarPorDataEmissao(val)[0];
            if (value)
              setLast({
                value: `R$ ${value.total.toFixed(2)}`,
                url: value.url,
              });
          }
        });
      }
    })();
  }, [currentUc]);

  return (
    <Container data-testid="dashboard-header">
      <Modal isOpen={modalUc} onClose={() => setModalUc(false)}>
        <h2>Selecione a UC desejada</h2>
        <div>
          {ucs
            ? ucs.map((val, i) => {
                return (
                  <div
                    onClick={() => {
                      setModalUc(false);
                      setCurrentUc(val);
                    }}
                    key={i}
                  >
                    <p>{val}</p>
                  </div>
                );
              })
            : null}
        </div>
      </Modal>
      <Modal isOpen={modalYear} onClose={() => setModalYear(false)}>
        <h2>Selecione o ano das faturas a serem requisitadas</h2>
        <div>
          {ucs
            ? ucs.map((val, i) => {
                return (
                  <div
                    onClick={() => {
                      setModalYear(false);
                      setYear(val);
                    }}
                    key={i}
                  >
                    <p>{val}</p>
                  </div>
                );
              })
            : null}
        </div>
      </Modal>
      <Header>
        <HeaderFirst>
          <Image
            src="./logolumi.svg"
            width={130}
            height={58}
            alt="Lumini Logo"
          />
          <Menu>
            <MenuItem active="true">
              <BsGraphUp size={24} />
              <p>Dashboard</p>
            </MenuItem>
            <MenuItem onClick={() => Router.replace("/historic")}>
              <BsListCheck size={24} />
              <p>Histórico de faturas</p>
            </MenuItem>
          </Menu>
          <div />
        </HeaderFirst>
        <HeaderSecond>
          <Title>
            <h2>Bem vindo(a)</h2>
            <p>Análise suas despesas de uma forma eficiente</p>
          </Title>
          <LastChecked>
            {last.value ? (
              <LastCheckedText>
                <p>Sua última fatura</p>
                <p>{last.value}</p>
              </LastCheckedText>
            ) : (
              <Loader size={77} />
            )}
            <LastCheckedButton
              onClick={() => {
                if (last.url) window.open(last.url, "_blank");
              }}
            >
              <BsDownload size={20} />
              <p>Baixar</p>
            </LastCheckedButton>
          </LastChecked>
          <div />
        </HeaderSecond>
        {currentUc ? (
          <HeaderThird>
            <p>UC: {currentUc}</p>
            <div onClick={() => setModalUc(true)}>
              <p>Mudar</p>
            </div>
          </HeaderThird>
        ) : (
          <Loader size={34} />
        )}
        <br />
        {year ? (
          <HeaderThird>
            <p>Ano: {year}</p>
            <div onClick={() => setModalYear(true)}>
              <p>Mudar</p>
            </div>
          </HeaderThird>
        ) : (
          <Loader size={34} />
        )}
      </Header>
    </Container>
  );
}
