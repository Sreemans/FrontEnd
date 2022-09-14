import { getAssociations } from "../action2";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({});

import axios from "axios";
jest.mock("axios");
const getResolve = () =>
  (axios.get = jest.fn(() =>
    Promise.resolve({ data: { success: true }, status: 200 })
  ));
const getReject = () =>
  (axios.get = jest.fn(() => Promise.reject({ data: { success: false } })));

describe("", () => {
  it("", async () => {
    getResolve();
    expect(store.dispatch(await getAssociations));
  });
  it("", async () => {
    getReject();
    expect(store.dispatch(await getAssociations));
  });
});
