import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router";
import { Switch, Route } from "react-router-dom";
import JerseyAdd from "./JerseyAdd";
import firebase from "firebase";
import {} from "react-router-dom/cjs/react-router-dom";
jest.mock("firebase");

describe("JerseyAdd", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should call firebase", async () => {
    const replace = jest.fn();
    const mockReturnValueFirebase = {
      database: jest.fn(),
      ref: jest.fn(),
      once: jest.fn(),
    };
    firebase.initializeApp.mockReturnValue(mockReturnValueFirebase);
    firebase.database.mockReturnValue(mockReturnValueFirebase);
    mockReturnValueFirebase.ref.mockReturnValue(mockReturnValueFirebase);
    const querySnapShot = { val: jest.fn() };
    mockReturnValueFirebase.once.mockResolvedValue(querySnapShot);
    const dummyLigas = [
      {
        uid: "1",
        image:
          "https://firebasestorage.googleapis.com/v0/b/jersipedia-d5965.appspot.com/o/ligas%2Fseriea.png?alt=media&token=c8e5e6b2-9aaa-4fbc-b9a2-6f8052c42515",
        liga_name: "Seri A",
      },
      {
        uid: "2",
        image:
          "https://firebasestorage.googleapis.com/v0/b/jersipedia-d5965.appspot.com/o/ligas%2Fpremierleague.png?alt=media&token=849b15c6-9c79-489e-a601-92c89cdaeefb",
        liga_name: "Premier League",
      },
    ];
    // expect select-liga punya properti querySnapShot.val.mockReturnValue([{}, {}])
    querySnapShot.val.mockReturnValue(dummyLigas);

    render(
      <MemoryRouter>
        <Switch>
          <Route>
            <JerseyAdd history={{ replace }} />
          </Route>
        </Switch>
      </MemoryRouter>
    );

    const inputLigaDropdown = await screen.findByTestId("select-liga");
    const fistOptionLiga = screen.getByTestId("select-liga-option-0");
    expect(fistOptionLiga).toBeTruthy();
    const secondOptionLiga = screen.getByTestId("select-liga-option-1");
    expect(secondOptionLiga).toBeTruthy();
    // simulate pakai fireEvent.change
    fireEvent.change(inputLigaDropdown, {
      target: { value: dummyLigas[0].uid },
    });
    expect(inputLigaDropdown.value).toEqual(dummyLigas[0].uid);
  });
});
