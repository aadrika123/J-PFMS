import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Input from "@/components/global/atoms/Input";

describe("Input Component", () => {
  it("renders input field with label", () => {
    const { getByLabelText } = render(
      <Input label="Username" name="username" />
    );

    const inputElement = getByLabelText("Username");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement.tagName).toBe("INPUT");
  });

  it("disables MouseWheeler for number input type", () => {
    const { getByLabelText } = render(
      <Input label="Age" name="age" type="number" readonly={true} />
    );

    const inputElement = getByLabelText("Age");

    fireEvent.wheel(inputElement);

    expect(inputElement).toHaveAttribute("type", "number");
    expect(inputElement).toBeDisabled();
  });

  it("triggers onChange handler when input value changes", () => {
    const handleChange = jest.fn();

    const { getByLabelText } = render(
      <Input label="Email" name="email" onChange={handleChange} />
    );

    const inputElement = getByLabelText("Email");

    fireEvent.change(inputElement, { target: { value: "test@example.com" } });

    expect(handleChange).toHaveBeenCalled();
    expect(inputElement).toHaveValue("test@example.com");
  });

  it("triggers onBlur handler when input loses focus", () => {
    const handleBlur = jest.fn();

    const { getByLabelText } = render(
      <Input label="Password" name="password" onBlur={handleBlur} />
    );

    const inputElement = getByLabelText("Password");

    fireEvent.blur(inputElement);

    expect(handleBlur).toHaveBeenCalled();
  });

  it("renders error message when touched and error prop is provided", () => {
    const errorMessage = "This field is required";

    const { getByText } = render(
      <Input
        label="Phone Number"
        name="phone"
        error={errorMessage}
        touched={true}
      />
    );

    const errorElement = getByText(errorMessage);

    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass("text-red-500");
  });
});
