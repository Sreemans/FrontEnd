import React, { useState } from "react";
import { fireEvent, render } from "@testing-library/react";
import { CardNames } from "../../../Components/Dashboard/Dashboard";
import Card from "../Card";
import { createMemoryHistory } from "history";
import { withRouter } from "react-router";
import { Router } from "react-router-dom";

test("card", () => {
  const setError = jest.fn();
  const history = createMemoryHistory();
  [...CardNames, { Name: "", Color: "coral" }].map((d) => {
    const { getByText } = render(
      <Router history={history}>
        <Card setError={setError} key={d.Name} Name={d.Name} Color={d.Color} />
      </Router>
    );
    const card = getByText(d.Name || "Card Name");
    expect(card.innerHTML).toBe(d.Name || "Card Name");
    fireEvent.click(card);
  });
});
