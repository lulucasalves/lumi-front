import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Historic } from "../components";

describe("<Historic />", () => {
  it("Test if about component render", () => {
    render(<Historic />);
    const Component = screen.getByTestId("historic-page");
    expect(Component).toBeInTheDocument();
  });
});
