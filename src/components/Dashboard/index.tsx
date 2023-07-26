import { DashboardGraphic, DashboardHeader } from "~/components";
import { Container, Content } from "./style";

export function Dashboard() {
  return (
    <Container>
      <DashboardHeader />
      <Content>
        <DashboardGraphic />
      </Content>
    </Container>
  );
}
