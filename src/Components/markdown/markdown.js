import React, { useEffect, useState } from 'react';
import ReactMarkdown from "react-markdown";
const mark_down = require('../../constants/SQLServercommandsandqueries.md')
export default function Markdown() {
    const [code, setCode] = useState('');
    useEffect(() => {
        fetch(mark_down)
            .then(c => c.text())
            .then(text => { console.log(text); setCode(text) })
            .catch(err => { console.log(err) })
    }, [])

    return (
        <div>
            <ReactMarkdown >{code}</ReactMarkdown>
        </div>
    );
}