import {
  DashboardGraphic,
  DashboardHeader,
  DashboardStatistic,
} from "../../components";
import { Container, Content } from "./style";

export function Dashboard() {
  return (
    <Container data-testid="dashboard-page">
      <DashboardHeader />
      <Content>
        <DashboardGraphic />
        <DashboardStatistic />
      </Content>
    </Container>
  );
}
