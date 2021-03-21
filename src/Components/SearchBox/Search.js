import React, { useState } from 'react'
import { Modules } from '../../Information/Modules';
import ReactHtmlParser from 'react-html-parser'
import './Search.scss'
// var _ = require('lodash');



export default function Search() {
    
    const [data, setData] = useState([]);
    
    const getData = (val) => {
        if (val) {
            let keys = Object.keys(Modules);
            let result = [];
            keys.map(k => {
                if (k.includes(val)) {
                    result.push(k)
                }
                return null;
            });
            setData(result);
        }
    }
    
    const dat = data && data;

    return (<div className="Search">
        <input className="SearchBox" id="SearchBox" type='search' placeholder="Search" onChange={(e) => { getData(e.target.value.toUpperCase()) }}></input>
        <div className="results">
            {dat && dat.map(k => {
                return (<div key={k} className="resultSnippet">
                    <div className="description">{ReactHtmlParser(Modules[k].description)}</div>
                    <div className="code">{(Modules[k].code)}</div>
                    <div className="moduleLink">Module Link: {ReactHtmlParser(Modules[k].moduleLink)}</div></div>
                )
            })}
        </div>
    </div>
    )
}