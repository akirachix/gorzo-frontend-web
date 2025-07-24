import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignIn from ".";

jest.mock("../hooks/useAuth");

jest.mock("./components/InputField", () => ({
  __esModule: true,
  default: (props) => (
    <input
      aria-label={props.label}
      placeholder={props.placeholder}
      type={props.type}
      value={props.value || ""}
      onChange={props.onChange}
      name={props.name}
    />
  ),
}));

describe("SignIn Component", () => {
  const mockSetPhone = jest.fn();
  const mockSetPin = jest.fn();
  const mockHandleLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    require("../hooks/useAuth").useSignIn = () => ({
      phone: "",
      setPhone: mockSetPhone,
      pin: "",
      setPin: mockSetPin,
      error: "",
      loading: false,
      handleLogin: mockHandleLogin,
    });
  });
const errorMessage="e.message"
  test("renders phone and PIN input fields", () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Phone Number/)).toBeInTheDocument();
    expect(screen.getByLabelText(/PIN/)).toBeInTheDocument();
  });

  test("allows entering phone number and PIN", () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );

    const phoneInput = screen.getByLabelText(/Phone Number/);
    const pinInput = screen.getByLabelText(/PIN/);

    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.change(pinInput, { target: { value: "1234" } });

    expect(mockSetPhone).toHaveBeenCalledWith("1234567890");
    expect(mockSetPin).toHaveBeenCalledWith("1234");
  });

  test("submits the form and calls handleLogin", async () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    const phoneInput = screen.getByLabelText(/Phone Number/);
    const pinInput = screen.getByLabelText(/PIN/);
    const loginButton = screen.getByRole("button", { name: /Log In/ });

    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.change(pinInput, { target: { value: "1234" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockHandleLogin).toHaveBeenCalled();
    });
  });

  test("displays error message when error exists", () => {
    const errorMessage="e.message"
    require("../hooks/useAuth").useSignIn = () => ({
      phone: "",
      setPhone: mockSetPhone,
      pin: "",
      setPin: mockSetPin,
      error: errorMessage,
      loading: false,
      handleLogin: mockHandleLogin,
    });

    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    expect(screen.getByText(/e.message/)).toBeInTheDocument();
  });
});

