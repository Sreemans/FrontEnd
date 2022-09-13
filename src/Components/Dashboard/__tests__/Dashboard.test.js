import React, { useState } from "react";
import {
  render,
  fireEvent
} from "@testing-library/react";
import Dashboard from "../Dashboard";
const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
test("loading dashboard 100", async () => {
  const { getByText, queryByText } = render(<Dashboard />);
  const css = getByText("CSS");
  expect(css.innerHTML).toBe("CSS");
  //   console.log(css)
  fireEvent.click(css);
  const errorMessage = queryByText("Under Development");
  expect(errorMessage.innerHTML).toBe("Under Development");
//   await wait(3000).then(re=> console.log(re)).catch(k=> console.log('err', k));
//   expect(errorMessage).not.toBeInTheDocument()
//   expect(queryByText("Under Development")).toBe(null);
});


