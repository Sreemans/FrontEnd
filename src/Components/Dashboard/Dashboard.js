import React, { useState } from 'react'
import Card from '../../CommonComponents/Card'
import Search from '../SearchBox/Search';
import { colours } from '../../constants/constants'
import './Dashboard.scss'
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa/index";
import obsidian from '../../images/obsidian.jpeg';
export default function Dashboard(props) {
    const [errorMessage, setErrorMessage] = useState("");
    const CardNames = [{ Name: "HTML", Color: "#d01515" },
    { Name: "Java Script", Color: "bisque" },
    { Name: "Node.js", Color: "lightgreen" },
    { Name: "CSS", Color: "skyblue" },
    { Name: "React.js", Color: "#cecae1" },
    { Name: "Motivation", Color: "coral" }
    ];
    //cssr 230 properties
    const setError = errorMessage => { setErrorMessage(errorMessage); setTimeout(() => setErrorMessage(""), 5000); };
    return (<div className="Dashboard">
        {/* <Search /> */}
        {errorMessage && <div className="error">{errorMessage}</div>}
        <main>
            <div className="user">
                <img />
                <h3>Sreeman Badugu</h3>
                <span><FaInstagram /> <a href="https://www.instagram.com/sreemans/" target="_blank">SreemanS</a></span>
                <span><FaTwitter /> <a href="https://twitter.com/Sreeman_S" target="_blank">Sreemans_s</a></span>
                <span><FaLinkedin /> <a href="https://twitter.com/Sreeman_S" target="_blank">Sreemans_s</a></span>

            </div>
            <div className='Cards'>
                {CardNames.map(d => <Card setError={setError} key={d.Name} Name={d.Name} Color={d.Color} />)}
            </div>
        </main>

        {/* <div className='Cards'>
            {CardNames.map(d => <Card key={d.Name} Name={d.Name} Color={d.Color} />)}
        </div> */}
    </div>

    )
}