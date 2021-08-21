import React, { useState } from 'react';
import { classes, functions, Identify, css } from '../../Information/JavaScript';
const list = ['Classes', 'Functions', 'Identify', 'events', 'css'];
function JavaScript() {
    const [set, setSet] = useState();
    const getHtml = () => {
        let _Html = []
        for (let cs in css) {
            _Html.push(<li>{`${cs}: ${css[cs]}`}</li>);
        }
        return _Html;
    }
    return (
        <div style={{padding: '20px'}}>
            <ul>
                {list.map(li => <li key={li} onClick={() => setSet(li)}>{li}</li>)}
            </ul>
            <ol>
                {set === 'Classes' && classes.map(li => <li key={li}>{li}</li>)}
                {set === 'Functions' && functions.map(li => <li key={li}>{li}</li>)}
                {set === 'Identify' && Identify.map(li => <li key={li}>{li}</li>)}
                {set === 'events' && Object.keys(window).map(function (e, i) { if (e.startsWith('on')) { return <li key={e}>{e}</li> } })}
                {set === 'css' && getHtml()}
            </ol>
        </div>

    )
}
export default JavaScript;