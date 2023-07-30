import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Loader } from "../components";

describe("<Loader />", () => {
  it("Test if about component render", () => {
    render(<Loader size={50} />);
    const Component = screen.getByTestId("loader");
    expect(Component).toBeInTheDocument();
  });
});
