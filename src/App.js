import React from 'react';
import Sample from './'
import './App.css';


const Tags = ['<html></html>', '<div></div>', '<a></a>', '<ul></ul>', '<li></li>']
export default class App extends React.Component {
  componentDidMount() {
    console.log(window.innerWidth)
  }

  render() {
    if (window.innerWidth == 320) {
      return (
        <h1 style={{ textAlign: "center" }}>Sai Teja</h1>
      )
    } else {
      return (
        <div className="App">
         <h1> {window.innerWidth}</h1>
          {/* <div className='HtmlTags'>
            {Tags.map(d => { return <li>{d}</li> })}
          </div> */}
        </div>
      );
    }
  }
}