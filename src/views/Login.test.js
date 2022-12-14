import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Login from "./Login";
import firebase from "firebase";
import swal from "sweetalert";
import { shallow } from "enzyme";
import flushPromises from "flush-promises";
import { Row, CardHeader, Input } from "reactstrap";

jest.mock("firebase");
jest.mock("sweetalert");

describe("Login", () => {
  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });
  // describe("Show Login Information", () => {
  //   it('should show "Login" on header', () => {
  //     render(<Login history={{ replace: jest.fn() }} />);

  //     const loginTitle = screen.getByRole("heading", { name: /login/i });
  //     expect(loginTitle).toBeTruthy();
  //   });

  //   it("should render form email, password and button login", async () => {
  //     render(<Login history={{ replace: jest.fn() }} />);

  //     const emailInput = screen.getByTestId("email");
  //     const passwordInput = screen.getByTestId("password");
  //     const buttonLogin = screen.getByRole("button", { name: /login/i });
  //     fireEvent.change(emailInput, { target: { value: "test@mail.com" } });
  //     fireEvent.change(passwordInput, { target: { value: "12345678" } });

  //     expect(emailInput).toBeTruthy();
  //     expect(passwordInput).toBeTruthy();

  //     expect(emailInput.value).toEqual("test@mail.com");
  //     expect(passwordInput.value).toEqual("12345678");
  //     expect(buttonLogin).toBeTruthy();
  //   });

  //   it("should button clicked is submitted success", () => {
  //     const replace = jest.fn();
  //     render(<Login history={{ replace }} />);
  //     const emailInput = screen.getByTestId("email");
  //     const passwordInput = screen.getByTestId("password");
  //     const loginForm = screen.getByTestId("login-form");
  //     const mockReturnValueFirebase = {
  //       auth: jest.fn(),
  //       database: jest.fn(),
  //       signInWithEmailAndPassword: jest.fn(),
  //       ref: jest.fn(),
  //       once: jest.fn(),
  //     };
  //     firebase.initializeApp.mockReturnValue(mockReturnValueFirebase);
  //     firebase.auth.mockReturnValue(mockReturnValueFirebase);
  //     firebase.database.mockReturnValue(mockReturnValueFirebase);
  //     mockReturnValueFirebase.signInWithEmailAndPassword.mockResolvedValue({
  //       user: { uid: "123", Aa: "eypsco" },
  //     });
  //     mockReturnValueFirebase.ref.mockReturnValue(mockReturnValueFirebase);
  //     const val = jest.fn();
  //     mockReturnValueFirebase.once.mockResolvedValue({ val });
  //     val.mockReturnValue({ uid: "123" });

  //     fireEvent.change(emailInput, { target: { value: "test@mail.com" } });
  //     fireEvent.change(passwordInput, { target: { value: "12345678" } });

  //     fireEvent.submit(loginForm);
  //     return waitFor(() => {
  //       expect(
  //         mockReturnValueFirebase.signInWithEmailAndPassword
  //       ).toBeCalledWith("test@mail.com", "12345678");
  //       expect(localStorage.getItem("admin")).toEqual(
  //         JSON.stringify({ uid: "123" })
  //       );
  //       expect(localStorage.getItem("access_token")).toEqual("eypsco");
  //       expect(replace).toBeCalledWith("/admin/dashboard");
  //     });
  //   });

  //   it("should button clicked is submitted error because not admin", () => {
  //     const replace = jest.fn();
  //     render(<Login history={{ replace }} />);
  //     const emailInput = screen.getByTestId("email");
  //     const passwordInput = screen.getByTestId("password");
  //     const loginForm = screen.getByTestId("login-form");
  //     const mockReturnValueFirebase = {
  //       auth: jest.fn(),
  //       database: jest.fn(),
  //       signInWithEmailAndPassword: jest.fn(),
  //       ref: jest.fn(),
  //       once: jest.fn(),
  //     };
  //     firebase.initializeApp.mockReturnValue(mockReturnValueFirebase);
  //     firebase.auth.mockReturnValue(mockReturnValueFirebase);
  //     firebase.database.mockReturnValue(mockReturnValueFirebase);
  //     mockReturnValueFirebase.signInWithEmailAndPassword.mockResolvedValue({
  //       user: { uid: "123", Aa: "eypsco" },
  //     });
  //     mockReturnValueFirebase.ref.mockReturnValue(mockReturnValueFirebase);
  //     const val = jest.fn();
  //     mockReturnValueFirebase.once.mockResolvedValue({ val });
  //     val.mockReturnValue(null);
  //     swal.mockReturnValue();
  //     fireEvent.change(emailInput, { target: { value: "test@mail.com" } });
  //     fireEvent.change(passwordInput, { target: { value: "12345678" } });

  //     fireEvent.submit(loginForm);

  //     return waitFor(() => {
  //       expect(
  //         mockReturnValueFirebase.signInWithEmailAndPassword
  //       ).toBeCalledWith("test@mail.com", "12345678");
  //       expect(swal).toBeCalledWith({
  //         text: "Maaf Anda Bukan Admin",
  //         icon: "error",
  //         title: "Error",
  //       });
  //     });
  //   });

  //   it("should button clicked is submitted error any else", () => {
  //     const replace = jest.fn();
  //     render(<Login history={{ replace }} />);
  //     const emailInput = screen.getByTestId("email");
  //     const passwordInput = screen.getByTestId("password");
  //     const loginForm = screen.getByTestId("login-form");
  //     const mockReturnValueFirebase = {
  //       auth: jest.fn(),
  //       database: jest.fn(),
  //       signInWithEmailAndPassword: jest.fn(),
  //       ref: jest.fn(),
  //       once: jest.fn(),
  //     };
  //     firebase.initializeApp.mockReturnValue(mockReturnValueFirebase);
  //     firebase.auth.mockReturnValue(mockReturnValueFirebase);
  //     mockReturnValueFirebase.signInWithEmailAndPassword.mockRejectedValue({
  //       msg: "Network Error",
  //     });
  //     swal.mockReturnValue();
  //     fireEvent.change(emailInput, { target: { value: "test@mail.com" } });
  //     fireEvent.change(passwordInput, { target: { value: "12345678" } });

  //     fireEvent.submit(loginForm);

  //     return waitFor(() => {
  //       expect(
  //         mockReturnValueFirebase.signInWithEmailAndPassword
  //       ).toBeCalledWith("test@mail.com", "12345678");
  //       expect(swal).toBeCalledWith({
  //         text: JSON.stringify({ msg: "Network Error" }),
  //         icon: "error",
  //         title: "Error",
  //       });
  //     });
  //   });
  // });

  describe("Login with Enzym", () => {
    describe("shallow login", () => {
      it("should render Login route", () => {
        const replace = jest.fn();
        const wrapper = shallow(<Login history={{ replace }} />);
        expect(wrapper.find(Row)).toHaveLength(1);
        const loginHeader = wrapper.find(CardHeader);
        expect(loginHeader.props().children).toEqual("Login");
      });

      it("should render form input", async () => {
        const replace = jest.fn();
        const wrapper = shallow(<Login history={{ replace }} />);
        const mockReturnValueFirebase = {
          auth: jest.fn(),
          database: jest.fn(),
          signInWithEmailAndPassword: jest.fn(),
          ref: jest.fn(),
          once: jest.fn(),
        };
        firebase.initializeApp.mockReturnValue(mockReturnValueFirebase);
        firebase.auth.mockReturnValue(mockReturnValueFirebase);
        firebase.database.mockReturnValue(mockReturnValueFirebase);
        mockReturnValueFirebase.signInWithEmailAndPassword.mockResolvedValue({
          user: { uid: "123", Aa: "eypsco" },
        });
        mockReturnValueFirebase.ref.mockReturnValue(mockReturnValueFirebase);
        const val = jest.fn();
        mockReturnValueFirebase.once.mockResolvedValue({ val });
        val.mockReturnValue({ uid: "123" });
        const preventDefault = jest.fn();
        const emailInput = wrapper.find(Input).at(0);
        emailInput.simulate("change", { target: { value: "test@mail.com" } });
        const passwordInput = wrapper.find(Input).at(1);
        passwordInput.simulate("change", { target: { value: "12345678" } });
        wrapper.update();
        const loginForm = wrapper.find("form");
       
        loginForm.simulate("submit", { preventDefault });
        await flushPromises();
        
        expect(wrapper.find(Input).at(0).props().value).toEqual(
          "test@mail.com"
        );
        expect(wrapper.find(Input).at(1).props().value).toEqual("12345678");
        expect(preventDefault).toBeCalled();
        expect(
          mockReturnValueFirebase.signInWithEmailAndPassword
        ).toBeCalledWith("test@mail.com", "12345678");
        expect(localStorage.getItem("admin")).toEqual(
          JSON.stringify({ uid: "123" })
        );
        expect(localStorage.getItem("access_token")).toEqual("eypsco");
        expect(replace).toBeCalledWith("/admin/dashboard");
      });
    });
  });
});
