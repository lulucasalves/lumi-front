import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Dashboard } from "../components";

describe("<Dashboard />", () => {
  it("Test if about component render", () => {
    render(<Dashboard />);
    const Component = screen.getByTestId("dashboard-page");
    expect(Component).toBeInTheDocument();
  });
});
