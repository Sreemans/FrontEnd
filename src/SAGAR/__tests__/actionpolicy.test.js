import { useSearchPolicyAction } from "../actionpolicy";
import { render, waitForElement } from "@testing-library/react";
import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode } from "react-dom";
import axios from "axios";

jest.mock("axios");

axios.get(() => Promise.resolve({ data: {} }));
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  singleInspection: {
    policy: {
      number: 3,
    },
  },
};

const store = mockStore(initialState);

let container = null;

const MC = ({ id }) => {
  const [searchPolicy, loading] = useSearchPolicyAction();
  const result = searchPolicy(id);
  return <div>{<h1>Loading...</h1>}</div>;
};

const TestComponent = ({ id }) => {
  return (
    <Provider store={store}>
      <MC id={id} />
    </Provider>
  );
};
describe("", () => {
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  // it("", async () => {
  //   act(() => {
  //     render(<TestComponent id={3} />, container);
  //   });
  //   await waitForElement(()=> expect(container.textContent))
  //   // expect();
  // });
  it("", async () => {
    act(() => {
      render(<TestComponent id={2} />);
    });
    await waitForElement(() => expect(container.textContent));

    // expect();
  });
});
