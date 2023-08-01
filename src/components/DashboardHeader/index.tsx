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
import { useContext, useState } from "react";
import { IContext, MyContext } from "../../context/Boleto";
import { Modal } from "../Modal";
import { Loader } from "../Loader";

export function DashboardHeader({
  last,
}: {
  last: { value: string; url: string };
}) {
  const { currentUc, ucs, setCurrentUc, year, setYear, years } =
    useContext<IContext>(MyContext);
  const [modalUc, setModalUc] = useState(false);
  const [modalYear, setModalYear] = useState(false);

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
        <h2>Selecione o ano desejado</h2>
        <div>
          {years
            ? years.map((val, i) => {
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
            {last && last.value ? (
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
