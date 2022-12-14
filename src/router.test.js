import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Router from "./router";
import { MemoryRouter } from "react-router";
// jest.mock("./views/Dashboard.js", () => "div");
jest.mock("react-chartjs-2", () => ({
  Line: () => <div></div>,
  Pie: () => <div></div>,
}));
describe("Router", () => {
  describe("Render Router Component", () => {
    beforeAll(() => {
      //scrollingElement.scrollTop
      Object.defineProperty(window.document, "scrollingElement", {
        value: { scrollTop: 0 },
      });
      //   Object.defineProperty(window, "addEventListener", {
      //     value: (key, callback) => {},
      //   });
    });
    it("should render login route if no access_token", () => {
      localStorage.clear();
      render(
        <MemoryRouter initialEntries={["/login"]}>
          <Router />
        </MemoryRouter>
      );
      const loginTitle = screen.getByRole("heading", { name: /login/i });
      expect(loginTitle).toBeTruthy();
    });

    it("should render admin route if any access_token", () => {
      localStorage.setItem("access_token", "eybshsd");
      localStorage.setItem(
        "admin",
        JSON.stringify({ uid: "123", email: "admin@mail.com", name: "admin" })
      );
      render(
        <MemoryRouter initialEntries={["/login"]}>
          <Router />
        </MemoryRouter>
      );
      expect(screen.getByText("Users Behavior")).toBeTruthy();
    });
  });
});
