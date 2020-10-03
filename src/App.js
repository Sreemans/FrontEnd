import React from 'react';
import Sample from './'
import './App.scss';


const Tags = ['<html></html>', '<div></div>', '<a></a>', '<ul></ul>', '<li></li>']
export default class App extends React.Component {
  componentDidMount() {
    console.log(window.innerWidth)
  }

  render() {
    let a = (window.innerWidth / 3) - 8 + 'px';
    let b = <div id="ChildBox" style={{ width: a, height: a }}></div>;
    let c = <div id="Coins" style={{ width: '30px', height: '30px', borderRadius: '25px', background: 'grey' }}></div>;
    let d = <div id="Coins" style={{ width: '30px', height: '30px', borderRadius: '25px', background: 'red' }}></div>;
    return (
      <div className="App">
        <div id="Box" style={{ width: window.innerWidth - '10px', height: window.innerWidth }}>
          {b}{b}{b}{b}{b}{b}{b}{b}{b}
        </div>
        <div id="Player">
          <div style={{ width: '50%' }}>
            <label>
              Player 1
            </label>
             <div id='P1'>{c}{c}{c}</div>
          </div>
          <div style={{ width: '50%' }}>
            <label>
              Player 2
            </label>
            <div id='P2'>{d}{d}{d}</div>
          </div>
        </div>
      </div>
    );
    // }
  }
}