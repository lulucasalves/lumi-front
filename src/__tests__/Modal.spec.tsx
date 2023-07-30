import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Modal } from "../components";

describe("<Modal />", () => {
  it("Test if about component render", () => {
    render(
      <Modal onClose={() => {}} isOpen={true}>
        <p>test</p>
      </Modal>
    );
    const Component = screen.getByTestId("modal");
    expect(Component).toBeInTheDocument();
  });
});
