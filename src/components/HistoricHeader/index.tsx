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

export function HistoricHeader() {
  return (
    <Container>
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
              <p>R$ 271,92</p>
            </LastCheckedText>
            <LastCheckedButton>
              <BsDownload size={20} />
              <p>Baixar</p>
            </LastCheckedButton>
          </LastChecked>
          <div />
        </HeaderSecond>
        <HeaderThird>
          <p>Endereço atual: 35182-036 TIMOTEO, MG</p>
          <div>
            <p>Mudar</p>
          </div>
        </HeaderThird>
      </Header>
    </Container>
  );
}
