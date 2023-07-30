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
import { IContext, MyContext } from "~/context/Boleto";
import { ucData, ucList } from "~/client/boletos";
import { Modal } from "../Modal";

export function HistoricHeader() {
  const { currentUc, ucs, setCurrentUc } = useContext<IContext>(MyContext);
  const [last, setLast] = useState({ value: "", url: "" });
  const [modal, setModal] = useState(false);

  useEffect(() => {
    (async () => {
      const [, numberUc] = currentUc.split(" - ");

      await ucList(numberUc).then((val) => {
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

        const value = ordenarPorDataEmissao(val)[0];
        if (value)
          setLast({ value: `R$ ${value.total.toFixed(2)}`, url: value.url });
      });
    })();
  }, [currentUc]);

  return (
    <Container>
      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <h2>Selecione a UC desejada</h2>
        <div>
          {ucs.length
            ? ucs.map((val, i) => {
                return (
                  <div
                    onClick={() => {
                      setModal(false);
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
      <Header>
        <HeaderFirst>
          <Image
            src="./logolumi.svg"
            width={130}
            height={58}
            alt="Lumini Logo"
          />
          <Menu>
            <MenuItem onClick={() => Router.replace("/")}>
              <BsGraphUp size={24} />
              <p>Dashboard</p>
            </MenuItem>
            <MenuItem active>
              <BsListCheck size={24} />
              <p>Histórico de faturas</p>
            </MenuItem>
          </Menu>
          <div />
        </HeaderFirst>
        <HeaderSecond>
          <Title>
            <h2>Bem vindo(a)</h2>
            <p>Veja seu histórico de faturas</p>
          </Title>
          <LastChecked>
            <LastCheckedText>
              <p>Sua última fatura</p>
              <p>{last.value}</p>
            </LastCheckedText>
            <LastCheckedButton onClick={() => window.open(last.url, "_blank")}>
              <BsDownload size={20} />
              <p>Baixar</p>
            </LastCheckedButton>
          </LastChecked>
          <div />
        </HeaderSecond>
        <HeaderThird>
          <p>UC: {currentUc}</p>
          <div onClick={() => setModal(true)}>
            <p>Mudar</p>
          </div>
        </HeaderThird>
      </Header>
    </Container>
  );
}
