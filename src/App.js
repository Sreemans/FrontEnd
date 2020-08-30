import React from 'react';
import './App.css';


const Tags = ['<html></html>', '<div></div>', '<a></a>', '<ul></ul>', '<li></li>']
function App() {
  return (
    <div className="App">
      <div className='HtmlTags'>
          {Tags.map(d => { return <li>{d}</li> })}
      </div>
    </div>
  );
}

export default App;