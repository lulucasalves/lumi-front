import { BsArrowRightCircle } from "react-icons/bs";
import { Container, Send, SendButton, Title } from "./style";

export function DashboardGraphic() {
  return (
    <Container>
      <Send>
        <Title>Suas faturas</Title>
        <SendButton>
          <BsArrowRightCircle size={24} />
          <p>Enviar boleto</p>
        </SendButton>
      </Send>
      <p>test</p>
    </Container>
  );
}
