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
        <div style={{ margin: '20px' }}>
            <a href='https://gist.github.com/ashish2199/8ad29d80f3195ce3166bee55b2624653'>Github</a>
            <ReactMarkdown >{code}</ReactMarkdown>
        </div>
    );
}
