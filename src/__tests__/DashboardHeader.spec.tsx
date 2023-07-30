import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DashboardHeader } from "../components";

describe("<DashboardHeader />", () => {
  it("Test if about component render", () => {
    render(<DashboardHeader />);
    const Component = screen.getByTestId("dashboard-header");
    expect(Component).toBeInTheDocument();
  });
});
