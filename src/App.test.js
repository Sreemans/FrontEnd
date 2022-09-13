// import React from "react";
// import { render, screen } from "@testing-library/react";
import App from "./App";
import React, { useState } from "react";
import { render, fireEvent, screen } from "@testing-library/react";

test("load dashboard", () => {
  render(<App />);
});
