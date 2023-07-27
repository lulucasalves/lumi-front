import {
  DashboardGraphic,
  DashboardHeader,
  DashboardStatistic,
} from "~/components";
import { Container, Content } from "./style";

export function Dashboard() {
  return (
    <Container>
      <DashboardHeader />
      <Content>
        <DashboardGraphic />
        <DashboardStatistic />
      </Content>
    </Container>
  );
}
