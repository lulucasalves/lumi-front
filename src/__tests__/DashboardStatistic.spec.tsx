import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DashboardStatistic } from "../components";

describe("<DashboardStatistic />", () => {
  it("Test if about component render", () => {
    render(<DashboardStatistic />);
    const Component = screen.getByTestId("dashboard-statistics");
    expect(Component).toBeInTheDocument();
  });
});
