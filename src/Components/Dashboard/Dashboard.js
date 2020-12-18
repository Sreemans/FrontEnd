import React from 'react'
import Card from '../../CommonComponents/Card'
import Search from '../SearchBox/Search';
import './Dashboard.scss'
export default function Dashboard(props) {

    let CardNames = [{ Name: "HTML", Color: "coral" },
    { Name: "Java Script", Color: "bisque" },
    { Name: "Node.js", Color: "lightgreen" },
    { Name: "CSS", Color: "skyblue" },
    { Name: "React.js", Color: "#cecae1" }
    ];

    return (<div className="Dashboard">
        <Search />
        <div className='Cards'>
            {CardNames.map(d => <Card key={d.Name} Name={d.Name} Color={d.Color} />)}
        </div>
    </div>

    )
}