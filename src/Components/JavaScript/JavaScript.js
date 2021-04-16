import React, { useState } from 'react';
import { classes, functions, Identify, css } from '../../Information/JavaScript';
// import { StandardLonghandProperties } from '../../../node_modules/csstype/index';
// import { Property } from '../../../node_modules/csstype/index'
// import obsidian from '../../images/obsidian.jpeg';
// import canary from '../../images/canary.jpeg';
// import watchet from '../../images/watchet.jpeg';
// import incarnadine from '../../images/incarnadine.jpeg';
// import indicolite from '../../images/indicolite.jpeg';
// import rouge from '../../images/rouge.jpeg';
// import verditer from '../../images/verditer.jpeg';
// import viridian from '../../images/viridian.jpeg';
// import zaffre from '../../images/zaffre.jpeg';
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
        <div>
            <ul>
                {list.map(li => <li key={li} onClick={() => setSet(li)}>{li}</li>)}
            </ul>
            <ol>
                {set === 'Classes' && classes.map(li => <li key={li}>{li}</li>)}
                {set === 'Functions' && functions.map(li => <li key={li}>{li}</li>)}
                {set === 'Identify' && Identify.map(li => <li key={li}>{li}</li>)}
                {set === 'events' && Object.keys(window).map((e, i) => { if (e.startsWith('on')) { return <li key={e}>{e}</li> } })}
                {set === 'css' && getHtml()}
            </ol>
            {/* <img src={obsidian}></img>
            <img src={canary}></img><img src={watchet}></img>
            <img src={incarnadine}></img>
            <img src={indicolite}></img>
            <img src={rouge}></img>
            <img src={verditer}></img>
            <img src={viridian}></img>
            <img src={zaffre}></img> */}
        </div>

    )
}
export default JavaScript;