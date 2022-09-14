import { render } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { orderInspection, useOrderBatchInspections } from "../actions";
import axios from "axios";
jest.mock('axios')
axios.get = () => Promise.resolve({ data: { success: true } });
var hook = null;
function RenderHook() {
  hook = useOrderBatchInspections([]);
  return null;
}
describe("", () => {
//   it("", async () => {
//     // act(() => {

//     // });
//     const { unmount } = render(<RenderHook />);
//     console.log(hook);
//     // await unmount()
//   });
  it("should return valid response", async () => {
    axios.post = () => Promise.reject({ data: { success: true } });
    await orderInspection({});
  });
  it("should reject api response", async () => {
    axios.post = () => Promise.resolve({ data: { success: true } });
    await orderInspection({});
  });
});
