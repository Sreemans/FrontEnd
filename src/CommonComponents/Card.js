import React, { useState } from 'react'
import './Card.scss'
export default function Card(props) {

    const [selectedCard, setSelectedCard] = useState("");

    const openPage = (cardName) => {
        if (cardName === selectedCard) {
            setSelectedCard("");
            return;
        }
        setSelectedCard(cardName);
    }

    return (
        <>
            <div className="Card" onClick={(e) => { openPage(props.Name) }}>
                <div className="CardName" style={{ background: props.Color ? props.Color : "rgb(209, 202, 202)" }} >
                    {props.Name ? props.Name : "Card Name"}
                </div>
            </div>
            <br />
            {
                selectedCard === "Motivation" ?
                    <div style={{ whiteSpace: "pre-line" }}>
                        {`          Tomorrow will never happen
                        let see what the hell happens today
                        life experience matters
                        If you know what (or) how to deal with now rest will happen successfully
                        You came to experience in life not to avoid life
                        Control your body, thoughts and emotion , life energies`}
                    </div> : ""
            }
        </>
    )
}