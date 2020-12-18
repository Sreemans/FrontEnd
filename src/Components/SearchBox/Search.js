import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import './Search.scss'

function createMarkup(){  
    var htmlString = '<h1 class="test">TESTING</h1>';
    return {__html : htmlString}

}
export default function Search() {
    let a = `<h1>Hi</h1>`
    return (<div className="Search">
        <input className="SearchBox" type='search' placeholder="Search" onChange={(e) => { console.log(e.target.value) }}></input>
        <div dangerouslySetInnerHTML={createMarkup()}></div>
        <div>{ReactHtmlParser(a)}</div>
    </div>
    )
}