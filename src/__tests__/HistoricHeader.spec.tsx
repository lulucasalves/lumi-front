import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HistoricHeader } from "../components";

describe("<HistoricHeader />", () => {
  it("Test if about component render", () => {
    render(<HistoricHeader />);
    const Component = screen.getByTestId("historic-header");
    expect(Component).toBeInTheDocument();
  });
});
