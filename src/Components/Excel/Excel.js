import React, { useState } from 'react';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
import ExcelTable from './ExcelTable';
import Spreadsheet from "react-spreadsheet";
export default function Excel() {
    const [state, setState] = useState({ rows: [], cols: [] })
    const fileHandler = (event) => {
        let fileObj = event.target.files[0];
        // ExcelRenderer(fileObj, (err, resp) => {
        //     if (err) {
        //         console.log(err);
        //     }
        //     else {
        //         console.log(resp)
        //         setState({
        //             cols: resp.cols,
        //             rows: resp.rows
        //         });
        //     }
        // });
        const file = new FileReader();

        file.onload((t, s) => {
            console.log(t, s)
        })

    }
    return (
        <>
            {/* <input type="file" onChange={fileHandler} style={{ "padding": "10px" }} />
            <ExcelTable cols={state.cols} rows={state.rows} /> */}
            <Spreadsheet data={data} />
        </>

    )
}



const data = [
  [{ value: "Vanilla" }, { value: "Chocolate" }],
  [{ value: "Strawberry" }, { value: "Cookies" }],
];
