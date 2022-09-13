
import React, { useState } from "react";
import { render } from "@testing-library/react"
import Markdown from "../markdown"

test('render markdown', ()=> {

    render(<Markdown></Markdown>)
})