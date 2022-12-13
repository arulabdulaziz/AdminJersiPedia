import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Login from "./Login";
import FIREBASE from "../config/FIREBASE";

jest.mock("../config/FIREBASE");
describe("Login", () => {
  //   describe("Show Login Information", () => {
  it('should show "Login" on header', () => {
    render(<Login history={{ replace: jest.fn() }} />);

    const loginTitle = screen.getByRole("heading", { name: /login/i });
    expect(loginTitle).toBeTruthy();
  });

  it("should render form email, password and button login", () => {
    render(<Login history={{ replace: jest.fn() }} />);

    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const buttonLogin = screen.getByRole("button", { name: /login/i });

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(buttonLogin).toBeTruthy();
  });

  it("should button clicked is submitted", () => {
    render(<Login history={{ replace: jest.fn() }} />);
    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const loginForm = screen.getByTestId("login-form");
    FIREBASE.auth.mockReturnValue({
      ...FIREBASE,
      signInWithEmailAndPassword: jest.fn(),
    });
    FIREBASE.database.mockReturnValue(FIREBASE);
    FIREBASE.signInWithEmailAndPassword.mockResolvedValue({
      user: { uid: "123", Aa: "eypsco" },
    });
    FIREBASE.ref.mockReturnValue(FIREBASE);
    const val = jest.fn();
    FIREBASE.once.mockResolvedValue({ val });
    val.mockReturnValue({});

    userEvent.type(emailInput, "test@mail.com");
    userEvent.type(passwordInput, "12345678");
    fireEvent.submit(loginForm);

    expect(localStorage.getItem("admin")).toEqual(JSON.stringify({}));
  });
  //   });
});
