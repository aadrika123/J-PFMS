import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "../src/components/global/atoms/buttons/Button"


describe("Button component", () => {
  it("renders the button with the correct variant and onClick handler", () => {

    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button variant="primary"  onClick={onClickMock}>
        Click me
      </Button>
    );

    const button = getByText("Click me");

    expect(button).toHaveClass("bg-primary_bg_indigo");

    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalled();
  });
});