import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Card.scss'
export default function Card(props) {
    const history = useHistory();
    const [selectedCard, setSelectedCard] = useState("");

    const openPage = (cardName) => {
        if (cardName === selectedCard) {
            setSelectedCard("");
            return;
        }
        console.log(`%c ${cardName}`, 'color: cyan')
        if(cardName === "Java Script"){
            history.push('/JavaScript');
        }
        else{
            props.setError("Under Development");
        }
        setSelectedCard(cardName);

    };

    return (
        <>
            <div className="Card" onClick={(e) => { openPage(props.Name) }}>
                <div className="CardName" > 
                    {props.Name ? props.Name : "Card Name"}
                </div>
            </div>
            <br />
            {
                selectedCard === "Motivation" &&
                <div style={{ whiteSpace: "pre-line" }}>
                    {`          Tomorrow will never happen
                        let see what the hell happens today
                        life experience matters
                        If you know what (or) how to deal with now rest will happen successfully
                        You came to experience in life not to avoid life
                        Control your body, thoughts and emotion , life energies`}
                </div>
            }
        </>
    )
}

//style={{ background: props.Color ? props.Color : "rgb(209, 202, 202)" }} 