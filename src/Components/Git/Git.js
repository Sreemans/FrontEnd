import React, { useState } from 'react';
import { xlsx } from '../../constants/constants'
require('./Git.scss');
function Git() {
    const [backGround, setBackGround] = useState("#4b62a7");
    return (
        <div className="Git" style={{ background: backGround }}>
            
            <div className="pageHead"><h1>Git </h1><label>Change Color <input type="color" onChange={(e) => { setBackGround(e.target.value) }} /></label></div>
            <section>
                <div className="header">
                    <div className="sub">Description 1</div>
                    <div className="sub">Git Command</div>
                    <div className="sub">Description 2</div>
                </div>
                {xlsx.Git.map((g, i) =>
                    <div key={`i${i}`} style={{ display: "flex" }}>
                        <div className="sub">{g.Desc1}</div>
                        <div className="sub">{g.Command}</div>
                        <div className="sub">{g.Desc2}</div>
                    </div>)}
            </section>
        </div>
    )
}

export default Git;