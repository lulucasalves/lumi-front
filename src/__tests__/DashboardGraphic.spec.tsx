import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DashboardGraphic } from "../components";

describe("<DashboardGraphic />", () => {
  it("Test if about component render", () => {
    render(<DashboardGraphic />);
    const Component = screen.getByTestId("dashboard-graphic");
    expect(Component).toBeInTheDocument();
  });
});
