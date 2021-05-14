import React, { useState } from 'react';
require('./Accordian.scss');
export const Accordian = (props) => {
    const { title } = props;
    const [showAccContent, setShowAccContent] = useState(false);
    const onAccClick = () => {
        setShowAccContent(!showAccContent);
    }
    return (<div className="Accordian">
        <button className="accordion" onClick={onAccClick}>{title}</button>
        {showAccContent && <div class="panel">
            <div>{props.children}</div>
        </div>}
    </div>)
}