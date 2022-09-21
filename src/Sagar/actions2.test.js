import {
  createProfiles,
  createRenewalProfilesCallsAction,
  deleteProfiles,
  updateCurrentProfile,
  updateCurrentRule,
} from "./actions2";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({});
import * as services from "./services";

services.getRenewalProfiles = jest.fn(() => Promise.resolve(""));
describe("", () => {
  it("testing renewal profiles", () => {
    store.dispatch(createRenewalProfilesCallsAction());
  });
  it("testing renewal profiles", () => {
    services.asyncRetry = jest.fn(() => Promise.reject(""));
    store.dispatch(createRenewalProfilesCallsAction());
  });
  it("deleteProfiles", () => {
    expect(deleteProfiles()).toEqual({ type: "DELETE_PROFILES" });
  });

  it("createProfiles", () => {
    expect(createProfiles([])).toEqual({
      type: "CREATE_PROFILES",
      profiles: [],
    });
  });
  it("updateCurrentProfile", () => {
    expect(updateCurrentProfile(3)).toEqual({
      type: "UPDATE_CURRENT_PROFILE",
      profileIndex: 3,
    });
  });
  it("updateCurrentRule", () => {
    expect(updateCurrentRule(3)).toEqual({
      type: "UPDATE_CURRENT_RULE",
      rule: 3,
    });
  });
});
